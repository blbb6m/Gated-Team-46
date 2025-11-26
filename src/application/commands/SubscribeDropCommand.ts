// src/application/commands/SubscribeDropCommand.ts
export class SubscribeDropCommand {
  constructor(
    public readonly userId: string,
    public readonly brandName: string,
    public readonly dropDate: string,
    public readonly collectionName?: string,
    public readonly productLink?: string,
    public readonly priceHint?: number,
  ) {}
}
