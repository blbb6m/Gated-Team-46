// src/application/commands/AddItemCommand.ts
export class AddItemCommand {
  constructor(
    public readonly userId: string,
    public readonly category: string,
    public readonly color: string,
    public readonly size: string,
    public readonly brand?: string,
    public readonly purchaseDate?: string,
    public readonly purchasePrice?: number,
    public readonly tags: string[] = [],
  ) {}
}
