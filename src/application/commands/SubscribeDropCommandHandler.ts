// src/application/commands/SubscribeDropCommandHandler.ts
import { CommandHandler } from "../CommandBus";
import { SubscribeDropCommand } from "./SubscribeDropCommand";
import { DropRepository } from "../../domain/repositories/DropRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { InMemoryEventBus } from "../../infrastructure/event_bus/InMemoryEventBus";
import { DropSubscribedEvent } from "../../domain/events/DropSubscribedEvent";

export class SubscribeDropCommandHandler implements CommandHandler<SubscribeDropCommand> {
  constructor(
    private readonly dropRepo: DropRepository,
    private readonly userRepo: UserRepository,
    private readonly eventBus: InMemoryEventBus,
  ) {}

  async handle(command: SubscribeDropCommand): Promise<any> {
    const user = await this.userRepo.findById(command.userId);
    if (!user) throw new Error("User not found");

    const dropId = await this.dropRepo.subscribeToDrop(
      command.userId,
      command.brandName,
      command.dropDate,
      command.collectionName,
      command.productLink,
      command.priceHint,
    );

    await this.eventBus.publish(new DropSubscribedEvent(dropId, command.userId));

    return { dropId };
  }
}
