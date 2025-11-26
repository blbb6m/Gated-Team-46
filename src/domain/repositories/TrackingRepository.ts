// src/domain/repositories/TrackingRepository.ts
export interface TrackingRepository {
  addTracking(
    userId: string,
    carrier: string,
    trackingNumber: string,
    label?: string,
  ): Promise<string>;

  getTrackingById(userId: string, trackingId: string): Promise<any | null>;

  getActiveShipmentsByUser(userId: string): Promise<any[]>;
}
