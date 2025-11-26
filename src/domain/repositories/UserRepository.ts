// src/domain/repositories/UserRepository.ts
export interface UserRepository {
  findById(userId: string): Promise<{ id: string } | null>;
}
