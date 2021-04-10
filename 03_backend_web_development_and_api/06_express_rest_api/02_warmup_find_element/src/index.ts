import { findGameFromSlug, Game } from "./game-finder";

const games: Game[] = [
  {
    name: "The Last of Us Part II",
    slug: "the-last-of-us-part-ii",
    cover: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1r0o.jpg",
    platform: "PS4",
  },
  {
    name: "The Last of Us Remastered",
    slug: "the-last-of-us-remastered",
    cover: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1ile.jpg",
    platform: "PS4",
  },
  {
    name: "Final Fantasy VII Remake",
    slug: "final-fantasy-vii-remake",
    cover: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1qxr.jpg",
    platform: "PS4",
  },
  {
    name: "God of War",
    slug: "god-of-war--1",
    cover: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1tmu.jpg",
    platform: "PS4",
  },
  {
    name: "God of War III: Remastered",
    slug: "god-of-war-iii-remastered",
    cover: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co2edr.jpg",
    platform: "PS4",
  },
  {
    name: "Bloodborne",
    slug: "bloodborne",
    cover: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co1rba.jpg",
    platform: "PS4",
  },
  {
    name: "Horizon Zero Dawn Collector's Edition",
    slug: "horizon-zero-dawn-collectors-edition",
    cover: "//images.igdb.com/igdb/image/upload/t_cover_small_2x/co24wq.jpg",
    platform: "PS4",
  },
  {
    name: "Evil Genius 2: World Domination",
    slug: "evil-genius-2-world-domination",
    cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co2urs.jpg",
    platform: "PC",
  },
  {
    name: "Red Ronin",
    slug: "red-ronin",
    cover: "//images.igdb.com/igdb/image/upload/t_cover_big/co26h8.jpg",
    platform: "PC",
  },
];

console.log(findGameFromSlug(games, "bloodborne"));
