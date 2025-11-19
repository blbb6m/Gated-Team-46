# services.py
from typing import List
from datetime import datetime

from models import TrackingItem, Carrier, TrackingStatus
from repositories import TrackingItemRepository
from api_clients import CarrierClientFactory

class TrackingService:
    """
    Orchestrates:
    - DB repo
    - Carrier API integrations
    - Domain model updates
    """

    def __init__(self, repo: TrackingItemRepository) -> None:
        self.repo = repo

    def add_tracking_item(
        self,
        user_id: int,
        tracking_number: str,
        carrier: Carrier,
        label: str,
    ) -> TrackingItem:
        item = TrackingItem(
            id=0,
            user_id=user_id,
            tracking_number=tracking_number,
            carrier=carrier,
            label=label,
            status=TrackingStatus.CREATED,
        )
        return self.repo.save(item)

    def get_user_items(self, user_id: int) -> List[TrackingItem]:
        return self.repo.find_by_user(user_id)

    def sync_item_with_carrier(self, item_id: int) -> TrackingItem:
        item = self.repo.find_by_id(item_id)
        if not item:
            raise ValueError(f"TrackingItem {item_id} not found")

        client = CarrierClientFactory.create(item.carrier)
        response = client.fetch_tracking(item.tracking_number)

        item.update_status(
            new_status=response.status,
            estimated_delivery=response.estimated_delivery,
            sync_time=datetime.utcnow(),
        )

        return self.repo.save(item)

    def bulk_sync_user_items(self, user_id: int):
        items = self.repo.find_by_user(user_id)
        updated = []

        for item in items:
            updated.append(self.sync_item_with_carrier(item.id))

        return updated