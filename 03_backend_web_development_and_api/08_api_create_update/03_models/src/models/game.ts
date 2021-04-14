export type Game = {
  name: string;
  slug: string;
  [key: string]: any
};

export type Platform = {
  name: string;
  slug: string;
  [key: string]: any
};

export class GameModel {
  collection: Game[];

  constructor(collection: Game[]) {
  }

  getAll(): Game[] {
  }

  findBySlug(slug: string): Game | null {
  }

  findByPlatform(platform_slug: string): Game[] {
  }

  getPlatforms(): Platform[] {
  }
}
