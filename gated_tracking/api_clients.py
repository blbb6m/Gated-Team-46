# api_clients.py
from abc import ABC, abstractmethod
from dataclasses import dataclass
from datetime import datetime, timedelta
from typing import Optional
from models import TrackingStatus, Carrier
from config import settings

@dataclass
class CarrierTrackingResponse:
    status: TrackingStatus
    estimated_delivery: Optional[datetime]

class CarrierApiClient(ABC):
    """Strategy base class for carrier integrations."""

    @abstractmethod
    def fetch_tracking(self, tracking_number: str) -> CarrierTrackingResponse:
        pass


class UspsApiClient(CarrierApiClient):
    def __init__(self, api_key: str) -> None:
        self.api_key = api_key

    def fetch_tracking(self, tracking_number: str) -> CarrierTrackingResponse:
        # mocked
        return CarrierTrackingResponse(
            status=TrackingStatus.IN_TRANSIT,
            estimated_delivery=datetime.utcnow() + timedelta(days=2),
        )


class UpsApiClient(CarrierApiClient):
    def __init__(self, api_key: str) -> None:
        self.api_key = api_key

    def fetch_tracking(self, tracking_number: str) -> CarrierTrackingResponse:
        return CarrierTrackingResponse(
            status=TrackingStatus.OUT_FOR_DELIVERY,
            estimated_delivery=datetime.utcnow() + timedelta(days=1),
        )


class FedexApiClient(CarrierApiClient):
    def __init__(self, api_key: str) -> None:
        self.api_key = api_key

    def fetch_tracking(self, tracking_number: str) -> CarrierTrackingResponse:
        return CarrierTrackingResponse(
            status=TrackingStatus.DELIVERED,
            estimated_delivery=datetime.utcnow(),
        )


class CarrierClientFactory:
    """Factory to create carrier API clients."""

    @staticmethod
    def create(carrier: Carrier) -> CarrierApiClient:
        if carrier == Carrier.USPS:
            return UspsApiClient(settings.usps_api_key)
        if carrier == Carrier.UPS:
            return UpsApiClient(settings.ups_api_key)
        if carrier == Carrier.FEDEX:
            return FedexApiClient(settings.fedex_api_key)

        # fallback
        return UspsApiClient(settings.usps_api_key)