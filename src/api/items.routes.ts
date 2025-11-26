import express from "express";
import { CommandBus } from "../application/CommandBus";
import { QueryBus } from "../application/QueryBus";
import { AddItemCommand } from "../application/commands/AddItemCommand";

export function itemsRoutes(commandBus: CommandBus, queryBus: QueryBus) {
  const router = express.Router();

  router.post("/", async (req, res) => {
    try {
      const userId = (req as any).user.id; // assume auth middleware sets req.user
      const { category, color, size, brand, purchaseDate, purchasePrice, tags } = req.body;
      const cmd = new AddItemCommand(
        userId,
        category,
        color,
        size,
        brand,
        purchaseDate,
        purchasePrice,
        tags || [],
      );
      const result = await commandBus.execute(cmd);
      res.status(201).json(result);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });

  return router;
}
