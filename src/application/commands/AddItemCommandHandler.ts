// src/application/commands/AddItemCommandHandler.ts
import { CommandHandler } from "../CommandBus";
import { AddItemCommand } from "./AddItemCommand";
import { ItemRepository } from "../../domain/repositories/ItemRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { InMemoryEventBus } from "../../infrastructure/event_bus/InMemoryEventBus";
import { ItemAddedEvent } from "../../domain/events/ItemAddedEvent";
export class AddItemCommandHandler implements CommandHandler<AddItemCommand> {
  constructor(
    private readonly itemRepo: ItemRepository,
    private readonly userRepo: UserRepository,
    private readonly eventBus: InMemoryEventBus,
  ) {}
  async handle(command: AddItemCommand): Promise<any> {
    const user = await this.userRepo.findById(command.userId);
    if (!user) throw new Error("User not found");
    const itemId = await this.itemRepo.createItem(
      command.category,
      command.color,
      command.size,
      command.brand,
      command.purchaseDate,
      command.purchasePrice,
      command.tags,
      command.userId,
    );
    await this.eventBus.publish(new ItemAddedEvent(itemId, command.userId));
    return { itemId };
  }
}
