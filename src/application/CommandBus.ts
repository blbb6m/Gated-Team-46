// src/application/CommandBus.ts
export interface CommandHandler<C> {
  handle(command: C): Promise<any>;
}

export class CommandBus {
  private handlers = new Map<string, CommandHandler<any>>();

  register<C>(commandName: string, handler: CommandHandler<C>) {
    this.handlers.set(commandName, handler as CommandHandler<any>);
  }

  async execute<C>(command: C): Promise<any> {
    const name = (command as any).constructor.name;
    const handler = this.handlers.get(name);
    if (!handler) {
      throw new Error(`No handler registered for command: ${name}`);
    }
    return handler.handle(command);
  }
}
