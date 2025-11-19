# models.py
from dataclasses import dataclass, field
from datetime import datetime
from enum import Enum
from typing import Optional

class Carrier(str, Enum):
    USPS = "USPS"
    UPS = "UPS"
    FEDEX = "FEDEX"
    OTHER = "OTHER"

class TrackingStatus(str, Enum):
    CREATED = "CREATED"
    IN_TRANSIT = "IN_TRANSIT"
    OUT_FOR_DELIVERY = "OUT_FOR_DELIVERY"
    DELIVERED = "DELIVERED"
    EXCEPTION = "EXCEPTION"
    UNKNOWN = "UNKNOWN"

@dataclass
class User:
    id: int
    email: str
    display_name: str

@dataclass
class TrackingItem:
    id: int
    user_id: int
    tracking_number: str
    carrier: Carrier
    label: str   # user-friendly nickname
    status: TrackingStatus = TrackingStatus.CREATED
    last_synced_at: Optional[datetime] = None
    estimated_delivery: Optional[datetime] = None
    created_at: datetime = field(default_factory=datetime.utcnow)
    updated_at: datetime = field(default_factory=datetime.utcnow)

    def update_status(
        self,
        new_status: TrackingStatus,
        estimated_delivery: Optional[datetime] = None,
        sync_time: Optional[datetime] = None,
    ) -> None:
        """Centralized domain update logic."""
        self.status = new_status
        if estimated_delivery is not None:
            self.estimated_delivery = estimated_delivery

        self.last_synced_at = sync_time or datetime.utcnow()
        self.updated_at = datetime.utcnow()