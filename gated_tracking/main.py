from gated_tracking import build_tracking_service, Carrier

def run_demo():
    service = build_tracking_service()

    item = service.add_tracking_item(
        user_id=1,
        tracking_number="TEST123",
        carrier=Carrier.USPS,
        label="Hoodie Drop",
    )
    print("Created:", item)

    synced = service.sync_item_with_carrier(item.id)
    print("After sync:", synced)

if __name__ == "__main__":
    run_demo()
