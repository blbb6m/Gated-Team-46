// src/domain/repositories/DropRepository.ts
export interface DropRepository {
  subscribeToDrop(
    userId: string,
    brandName: string,
    dropDate: string,
    collectionName?: string,
    productLink?: string,
    priceHint?: number,
  ): Promise<string>;

  getUpcomingDropsByUser(userId: string): Promise<any[]>;
}
