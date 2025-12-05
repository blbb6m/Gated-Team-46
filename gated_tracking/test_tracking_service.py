from gated_tracking.models import Carrier, TrackingStatus
from gated_tracking.repositories import InMemoryTrackingItemRepository
from gated_tracking.services import TrackingService

def test_sync_updates_status():
    repo = InMemoryTrackingItemRepository()
    service = TrackingService(repo)

    item = service.add_tracking_item(
        user_id=1,
        tracking_number="XYZ123",
        carrier=Carrier.FEDEX,
        label="Shoes",
    )

    synced = service.sync_item_with_carrier(item.id)

    assert synced.status in {
        TrackingStatus.IN_TRANSIT,
        TrackingStatus.OUT_FOR_DELIVERY,
        TrackingStatus.DELIVERED,
    }
    assert synced.estimated_delivery is not None
