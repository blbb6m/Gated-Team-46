// src/infrastructure/event_bus/InMemoryEventBus.ts
export type EventHandler = (event: any) => Promise<void> | void;

export class InMemoryEventBus {
  private handlers = new Map<string, EventHandler[]>();

  subscribe(eventName: string, handler: EventHandler) {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)!.push(handler);
  }

  async publish(event: any) {
    const name = event.constructor.name;
    const handlers = this.handlers.get(name) || [];
    for (const h of handlers) {
      await h(event);
    }
  }
}
