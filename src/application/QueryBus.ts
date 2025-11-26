// src/application/QueryBus.ts
export interface QueryHandler<Q> {
  handle(query: Q): Promise<any>;
}

export class QueryBus {
  private handlers = new Map<string, QueryHandler<any>>();

  register<Q>(queryName: string, handler: QueryHandler<Q>) {
    this.handlers.set(queryName, handler as QueryHandler<any>);
  }

  async execute<Q>(query: Q): Promise<any> {
    const name = (query as any).constructor.name;
    const handler = this.handlers.get(name);
    if (!handler) {
      throw new Error(`No handler registered for query: ${name}`);
    }
    return handler.handle(query);
  }
}
