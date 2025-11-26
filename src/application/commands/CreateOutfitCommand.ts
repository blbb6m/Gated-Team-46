// src/application/commands/CreateOutfitCommand.ts
export class CreateOutfitCommand {
  constructor(
    public readonly userId: string,
    public readonly name: string,
    public readonly itemIds: string[],
  ) {}
}
