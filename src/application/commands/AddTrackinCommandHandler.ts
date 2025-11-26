// src/application/commands/AddTrackingCommandHandler.ts
import { CommandHandler } from "../CommandBus";
import { AddTrackingCommand } from "./AddTrackingCommand";
import { TrackingRepository } from "../../domain/repositories/TrackingRepository";
import { UserRepository } from "../../domain/repositories/UserRepository";
import { InMemoryEventBus } from "../../infrastructure/event_bus/InMemoryEventBus";
import { TrackingAddedEvent } from "../../domain/events/TrackingAddedEvent";

export class AddTrackingCommandHandler implements CommandHandler<AddTrackingCommand> {
  constructor(
    private readonly trackingRepo: TrackingRepository,
    private readonly userRepo: UserRepository,
    private readonly eventBus: InMemoryEventBus,
  ) {}

  async handle(command: AddTrackingCommand): Promise<any> {
    const user = await this.userRepo.findById(command.userId);
    if (!user) throw new Error("User not found");

    const trackingId = await this.trackingRepo.addTracking(
      command.userId,
      command.carrier,
      command.trackingNumber,
      command.label,
    );

    await this.eventBus.publish(new TrackingAddedEvent(trackingId, command.userId));

    return { trackingId };
  }
}
