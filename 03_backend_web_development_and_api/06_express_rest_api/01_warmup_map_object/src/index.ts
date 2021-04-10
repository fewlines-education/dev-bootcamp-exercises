import { gameMapper, GameWithALotOfData } from "./game-mapper";

const ps4Games: GameWithALotOfData[] = [
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
  {
    name: "Uncharted: Drake's Fortune Remastered",
    slug: "uncharted-drakes-fortune-remastered",
    code: 41878,
    cover: {
      thumbnail: "//images.igdb.com/igdb/image/upload/t_thumb/co1un2.jpg",
      url: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1un2.jpg",
    },
  },
  {
    name: "Uncharted 3: Drake's Deception Remastered",
    slug: "uncharted-3-drakes-deception-remastered",
    code: 41876,
    cover: {
      thumbnail: "//images.igdb.com/igdb/image/upload/t_thumb/co1tpr.jpg",
      url: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1tpr.jpg",
    },
  },
  {
    name: "The Last of Us Part II",
    slug: "the-last-of-us-part-ii",
    code: 26192,
    cover: {
      thumbnail: "//images.igdb.com/igdb/image/upload/t_thumb/co1r0o.jpg",
      url: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1r0o.jpg",
    },
  },
  {
    name: "The Last of Us Remastered",
    slug: "the-last-of-us-remastered",
    code: 6036,
    cover: {
      thumbnail: "//images.igdb.com/igdb/image/upload/t_thumb/co1ile.jpg",
      url: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1ile.jpg",
    },
  },
  {
    name: "Final Fantasy VII Remake",
    slug: "final-fantasy-vii-remake",
    code: 11169,
    cover: {
      thumbnail: "//images.igdb.com/igdb/image/upload/t_thumb/co1qxr.jpg",
      url: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1qxr.jpg",
    },
  },
  {
    name: "God of War",
    slug: "god-of-war--1",
    code: 19560,
    cover: {
      thumbnail: "//images.igdb.com/igdb/image/upload/t_thumb/co1tmu.jpg",
      url: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1tmu.jpg",
    },
  },
  {
    name: "God of War III: Remastered",
    slug: "god-of-war-iii-remastered",
    code: 19959,
    cover: {
      thumbnail: "//images.igdb.com/igdb/image/upload/t_thumb/co2edr.jpg",
      url: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co2edr.jpg",
    },
  },
  {
    name: "Bloodborne",
    slug: "bloodborne",
    code: 7334,
    cover: {
      thumbnail: "//images.igdb.com/igdb/image/upload/t_thumb/co1rba.jpg",
      url: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1rba.jpg",
    },
  },
  {
    name: "Horizon Zero Dawn Collector's Edition",
    slug: "horizon-zero-dawn-collectors-edition",
    code: 42920,
    cover: {
      thumbnail: "//images.igdb.com/igdb/image/upload/t_thumb/co24wq.jpg",
      url: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co24wq.jpg",
    },
  },
];

console.log(gameMapper(ps4Games));
