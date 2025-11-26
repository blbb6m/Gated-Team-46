// src/application/commands/AddTrackingCommand.ts
export class AddTrackingCommand {
  constructor(
    public readonly userId: string,
    public readonly carrier: string,
    public readonly trackingNumber: string,
    public readonly label?: string,
  ) {}
}
