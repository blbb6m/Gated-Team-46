import express from "express";
import { CommandBus } from "../application/CommandBus";
import { QueryBus } from "../application/QueryBus";
import { SubscribeDropCommand } from "../application/commands/SubscribeDropCommand";
export function dropsRoutes(commandBus: CommandBus, queryBus: QueryBus) {
  const router = express.Router();
  router.post("/subscribe", async (req, res) => {
    try {
      const userId = (req as any).user.id;
      const { brandName, dropDate, collectionName, productLink, priceHint } = req.body;
      const cmd = new SubscribeDropCommand(
        userId,
        brandName,
        dropDate,
        collectionName,
        productLink,
        priceHint,
      );
      const result = await commandBus.execute(cmd);
      res.status(201).json(result);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });
  return router;
}
