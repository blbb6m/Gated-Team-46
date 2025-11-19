# config.py
from enum import Enum

class Env(str, Enum):
    DEV = "dev"
    PROD = "prod"

class Settings:
    def __init__(self, env: Env = Env.DEV):
        self.env = env
        # normally pulled from .env or environment
        self.database_url = "postgresql://user:password@localhost:5432/gated"
        self.usps_api_key = "USPS_API_KEY_HERE"
        self.ups_api_key = "UPS_API_KEY_HERE"
        self.fedex_api_key = "FEDEX_API_KEY_HERE"

settings = Settings()