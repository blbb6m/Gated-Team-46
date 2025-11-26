// src/application/commands/CreateOutfitCommandHandler.ts
import { CommandHandler } from "../CommandBus";
import { CreateOutfitCommand } from "./CreateOutfitCommand";
import { OutfitRepository } from "../../domain/repositories/OutfitRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { InMemoryEventBus } from "../../infrastructure/event_bus/InMemoryEventBus";
import { OutfitCreatedEvent } from "../../domain/events/OutfitCreatedEvent";
import { ItemRepository } from "../../domain/repositories/ItemRepository";

export class CreateOutfitCommandHandler implements CommandHandler<CreateOutfitCommand> {
  constructor(
    private readonly outfitRepo: OutfitRepository,
    private readonly userRepo: UserRepository,
    private readonly itemRepo: ItemRepository,
    private readonly eventBus: InMemoryEventBus,
  ) {}

  async handle(command: CreateOutfitCommand): Promise<any> {
    const user = await this.userRepo.findById(command.userId);
    if (!user) throw new Error("User not found");
    if (!command.itemIds || command.itemIds.length === 0) {
      throw new Error("Outfit must contain at least one item");
    }

    // optional: verify items belong to user using ItemRepo if you add that method

    const outfitId = await this.outfitRepo.createOutfit(
      command.name,
      command.userId,
      command.itemIds,
    );

    await this.eventBus.publish(new OutfitCreatedEvent(outfitId, command.userId));

    return { outfitId };
  }
}
