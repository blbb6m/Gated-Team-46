// src/domain/repositories/OutfitRepository.ts
export interface OutfitRepository {
  createOutfit(
    name: string,
    userId: string,
    itemIds: string[],
  ): Promise<string>;

  getOutfitsByUser(userId: string): Promise<any[]>;
}
