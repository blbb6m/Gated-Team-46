import express from "express";
import { CommandBus } from "../application/CommandBus";
import { QueryBus } from "../application/QueryBus";
import { AddTrackingCommand } from "../application/commands/AddTrackingCommand";

export function trackingRoutes(commandBus: CommandBus, queryBus: QueryBus) {
  const router = express.Router();

  router.post("/", async (req, res) => {
    try {
      const userId = (req as any).user.id;
      const { carrier, trackingNumber, label } = req.body;
      const cmd = new AddTrackingCommand(userId, carrier, trackingNumber, label);
      const result = await commandBus.execute(cmd);
      res.status(201).json(result);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  // GET /tracking/:id could call a query handler if you add it.

  return router;
}
