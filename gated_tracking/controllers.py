# controllers.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List

from models import Carrier, TrackingItem
from repositories import InMemoryTrackingItemRepository
from services import TrackingService

app = FastAPI(title="Gated Item Tracking API")

repo = InMemoryTrackingItemRepository()
tracking_service = TrackingService(repo=repo)

class TrackingItemCreateRequest(BaseModel):
    user_id: int
    tracking_number: str
    carrier: Carrier
    label: str

class TrackingItemResponse(BaseModel):
    id: int
    user_id: int
    tracking_number: str
    carrier: Carrier
    label: str
    status: str
    estimated_delivery: str | None

    @staticmethod
    def from_model(item: TrackingItem) -> "TrackingItemResponse":
        return TrackingItemResponse(
            id=item.id,
            user_id=item.user_id,
            tracking_number=item.tracking_number,
            carrier=item.carrier,
            label=item.label,
            status=item.status.value,
            estimated_delivery=(
                item.estimated_delivery.isoformat()
                if item.estimated_delivery else None
            ),
        )

@app.post("/tracking-items", response_model=TrackingItemResponse)
def create_tracking_item(request: TrackingItemCreateRequest):
    item = tracking_service.add_tracking_item(
        user_id=request.user_id,
        tracking_number=request.tracking_number,
        carrier=request.carrier,
        label=request.label,
    )
    return TrackingItemResponse.from_model(item)

@app.get("/users/{user_id}/tracking-items", response_model=List[TrackingItemResponse])
def list_user_items(user_id: int):
    items = tracking_service.get_user_items(user_id)
    return [TrackingItemResponse.from_model(i) for i in items]

@app.post("/tracking-items/{item_id}/sync", response_model=TrackingItemResponse)
def sync_tracking_item(item_id: int):
    try:
        item = tracking_service.sync_item_with_carrier(item_id)
    except ValueError:
        raise HTTPException(status_code=404, detail="Tracking item not found")
    return TrackingItemResponse.from_model(item)