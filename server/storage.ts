export interface IStorage {
  // Empty storage since the app is completely client-side for privacy
}

export class MemStorage implements IStorage {
}

export const storage = new MemStorage();