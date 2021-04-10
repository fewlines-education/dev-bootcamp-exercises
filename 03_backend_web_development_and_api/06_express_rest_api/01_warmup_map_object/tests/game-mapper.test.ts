import { gameMapper } from "../src/game-mapper";

it("Should transform an array of game data to an array of a simpler object", () => {
  const result1 = gameMapper([
    {
      name: "Uncharted 4: A Thief's End",
      slug: "uncharted-4-a-thief-s-end",
      code: 7331,
      cover: {
        thumbnail: "//images.igdb.com/igdb/image/upload/t_thumb/co1r7h.jpg",
        url: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1r7h.jpg",
      },
    },
    {
      name: "Uncharted 2: Among Thieves Remastered",
      slug: "uncharted-2-among-thieves-remastered",
      code: 41877,
      cover: {
        thumbnail: "//images.igdb.com/igdb/image/upload/t_thumb/co1un4.jpg",
        url: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1un4.jpg",
      },
    },
  ]);

  expect(result1).toEqual([
    {
      name: "Uncharted 4: A Thief's End",
      slug: "uncharted-4-a-thief-s-end",
      cover: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1r7h.jpg",
    },
    {
      name: "Uncharted 2: Among Thieves Remastered",
      slug: "uncharted-2-among-thieves-remastered",
      cover: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1un4.jpg",
    },
  ]);

  const result2 = gameMapper([
    {
      name: "Uncharted 4: A Thief's End",
      slug: "uncharted-4-a-thief-s-end",
      code: 7331,
      cover: {
        thumbnail: "//images.igdb.com/igdb/image/upload/t_thumb/co1r7h.jpg",
        url: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1r7h.jpg",
      },
    },
  ]);

  expect(result2).toEqual([
    {
      name: "Uncharted 4: A Thief's End",
      slug: "uncharted-4-a-thief-s-end",
      cover: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1r7h.jpg",
    },
  ]);
});

it("Should work with emty arrays", () => {
  expect(gameMapper([])).toEqual([]);
});
