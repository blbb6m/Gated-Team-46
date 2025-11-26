// src/domain/events/ItemAddedEvent.ts
export class ItemAddedEvent {
  constructor(
    public readonly itemId: string,
    public readonly userId: string,
  ) {}
}
