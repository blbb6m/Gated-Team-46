// src/domain/events/DropSubscribedEvent.ts
export class DropSubscribedEvent {
  constructor(
    public readonly dropId: string,
    public readonly userId: string,
  ) {}
}
