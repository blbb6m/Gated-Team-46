// src/domain/events/OutfitCreatedEvent.ts
export class OutfitCreatedEvent {
  constructor(
    public readonly outfitId: string,
    public readonly userId: string,
  ) {}
}
