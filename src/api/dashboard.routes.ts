import express from "express";
import { CommandBus } from "../application/CommandBus";
import { QueryBus } from "../application/QueryBus";
import { GetDashboardQuery } from "../application/queries/GetDashboardQuery";
export function dashboardRoutes(commandBus: CommandBus, queryBus: QueryBus) {
  const router = express.Router();
  router.get("/", async (req, res) => {
    try {
      const userId = (req as any).user.id;
      const result = await queryBus.execute(new GetDashboardQuery(userId));
      res.json(result);
    } catch (e: any) {
      res.status(400).json({ error: e.message });
    }
  });
  return router;
}
