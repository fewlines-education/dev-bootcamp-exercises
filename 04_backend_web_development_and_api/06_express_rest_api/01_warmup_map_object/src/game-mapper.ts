
export function gameMapper(games: GameWithALotOfData[]): Game[] {
}

export type Game = {
  name: string;
  slug: string;
  cover: string;
}

export type GameWithALotOfData = {
  name: string;
  slug: string;
  code: number;
  cover: {
    thumbnail: string;
    url: string;
  }
}
