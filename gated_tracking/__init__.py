from .models import Carrier, TrackingStatus, TrackingItem, User
from .repositories import InMemoryTrackingItemRepository, TrackingItemRepository
from .services import TrackingService
from .api_clients import CarrierClientFactory
from .config import settings


def build_tracking_service() -> TrackingService:
    """
    Build a TrackingService with an in-memory repository.
    Useful for tests, demos, or CLI tools.
    """
    repo = InMemoryTrackingItemRepository()
    return TrackingService(repo=repo)
