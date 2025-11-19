# repositories.py
from abc import ABC, abstractmethod
from typing import List, Optional, Dict
from models import TrackingItem

class TrackingItemRepository(ABC):
    """Repository interface."""

    @abstractmethod
    def save(self, item: TrackingItem) -> TrackingItem:
        pass

    @abstractmethod
    def find_by_id(self, item_id: int) -> Optional[TrackingItem]:
        pass

    @abstractmethod
    def find_by_user(self, user_id: int) -> List[TrackingItem]:
        pass

    @abstractmethod
    def find_by_tracking_number(self, tracking_number: str) -> Optional[TrackingItem]:
        pass


class InMemoryTrackingItemRepository(TrackingItemRepository):
    """In-memory DB replacement for prototyping/tests."""

    def __init__(self) -> None:
        self._items: Dict[int, TrackingItem] = {}
        self._next_id: int = 1

    def save(self, item: TrackingItem) -> TrackingItem:
        if item.id == 0:
            item.id = self._next_id
            self._next_id += 1
        self._items[item.id] = item
        return item

    def find_by_id(self, item_id: int) -> Optional[TrackingItem]:
        return self._items.get(item_id)

    def find_by_user(self, user_id: int) -> List[TrackingItem]:
        return [i for i in self._items.values() if i.user_id == user_id]

    def find_by_tracking_number(self, tracking_number: str) -> Optional[TrackingItem]:
        for item in self._items.values():
            if item.tracking_number == tracking_number:
                return item
        return None