// src/domain/repositories/ItemRepository.ts
export interface ItemRepository {
  createItem(
    category: string,
    color: string,
    size: string,
    brand: string | undefined,
    purchaseDate: string | undefined,
    purchasePrice: number | undefined,
    tags: string[],
    userId: string,
  ): Promise<string>;

  getItemsByUser(userId: string): Promise<any[]>;
}
