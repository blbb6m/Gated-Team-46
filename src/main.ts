// src/main.ts
import express from "express";
import bodyParser from "body-parser";

import { CommandBus } from "./application/CommandBus";
import { QueryBus } from "./application/QueryBus";
import { InMemoryEventBus } from "./infrastructure/event_bus/InMemoryEventBus";

import { AddItemCommandHandler } from "./application/commands/AddItemCommandHandler";
import { CreateOutfitCommandHandler } from "./application/commands/CreateOutfitCommandHandler";
import { AddTrackingCommandHandler } from "./application/commands/AddTrackingCommandHandler";
import { SubscribeDropCommandHandler } from "./application/commands/SubscribeDropCommandHandler";
import { GetDashboardQueryHandler } from "./application/queries/GetDashboardQueryHandler";

import { itemsRoutes } from "./api/items.routes";
import { trackingRoutes } from "./api/tracking.routes";
import { dropsRoutes } from "./api/drops.routes";
import { dashboardRoutes } from "./api/dashboard.routes";

// TODO: import your concrete repository implementations:
import { MySqlUserRepository } from "./infrastructure/db/MySqlUserRepository";
import { MySqlItemRepository } from "./infrastructure/db/MySqlItemRepository";
import { MySqlOutfitRepository } from "./infrastructure/db/MySqlOutfitRepository";
import { MySqlTrackingRepository } from "./infrastructure/db/MySqlTrackingRepository";
import { MySqlDropRepository } from "./infrastructure/db/MySqlDropRepository";

async function bootstrap() {
  const app = express();
  app.use(bodyParser.json());

  const commandBus = new CommandBus();
  const queryBus = new QueryBus();
  const eventBus = new InMemoryEventBus();

  const userRepo = new MySqlUserRepository();
  const itemRepo = new MySqlItemRepository();
  const outfitRepo = new MySqlOutfitRepository();
  const trackingRepo = new MySqlTrackingRepository();
  const dropRepo = new MySqlDropRepository();

  // Register command handlers
  commandBus.register(
    "AddItemCommand",
    new AddItemCommandHandler(itemRepo, userRepo, eventBus),
  );
  commandBus.register(
    "CreateOutfitCommand",
    new CreateOutfitCommandHandler(outfitRepo, userRepo, itemRepo, eventBus),
  );
  commandBus.register(
    "AddTrackingCommand",
    new AddTrackingCommandHandler(trackingRepo, userRepo, eventBus),
  );
  commandBus.register(
    "SubscribeDropCommand",
    new SubscribeDropCommandHandler(dropRepo, userRepo, eventBus),
  );

  // Register query handlers
  queryBus.register(
    "GetDashboardQuery",
    new GetDashboardQueryHandler(itemRepo, outfitRepo, trackingRepo, dropRepo),
  );

  // Routes
  app.use("/api/items", itemsRoutes(commandBus, queryBus));
  app.use("/api/tracking", trackingRoutes(commandBus, queryBus));
  app.use("/api/drops", dropsRoutes(commandBus, queryBus));
  app.use("/api/dashboard", dashboardRoutes(commandBus, queryBus));

  app.listen(3000, () => {
    console.log("API listening on port 3000");
  });
}

bootstrap();
