// src/application/queries/GetDashboardQueryHandler.ts
import { QueryHandler } from "../QueryBus";
import { GetDashboardQuery } from "./GetDashboardQuery";
import { ItemRepository } from "../../domain/repositories/ItemRepository";
import { OutfitRepository } from "../../domain/repositories/OutfitRepository";
import { TrackingRepository } from "../../domain/repositories/TrackingRepository";
import { DropRepository } from "../../domain/repositories/DropRepository";

export class GetDashboardQueryHandler implements QueryHandler<GetDashboardQuery> {
  constructor(
    private readonly itemRepo: ItemRepository,
    private readonly outfitRepo: OutfitRepository,
    private readonly trackingRepo: TrackingRepository,
    private readonly dropRepo: DropRepository,
  ) {}

  async handle(query: GetDashboardQuery): Promise<any> {
    const [items, outfits, shipments, drops] = await Promise.all([
      this.itemRepo.getItemsByUser(query.userId),
      this.outfitRepo.getOutfitsByUser(query.userId),
      this.trackingRepo.getActiveShipmentsByUser(query.userId),
      this.dropRepo.getUpcomingDropsByUser(query.userId),
    ]);

    return {
      items,
      outfits,
      shipments,
      drops,
    };
  }
}
