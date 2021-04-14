import { GameModel } from "../../src/models/game";
import games from "../../src/games.json";

const gameModel = new GameModel(games);

describe("getAll", () => {
  it("Should get all the games", () => {
    expect.assertions(1);

    const allGames = gameModel.getAll();

    expect(allGames.length).toBe(games.length);
  });

  it("All games should have name, slug and cover", () => {
    expect.assertions(1);

    const allGames = gameModel.getAll();

    expect(Object.keys(allGames[0])).toEqual(["name", "slug", "cover"]);
  });
});

describe("findBySlug", () => {
  it("Should find a game by its slug", () => {
    expect.assertions(1);

    const chopperAttack = games.find((game) => game.slug === "chopper-attack");

    const oneGame = gameModel.findBySlug("chopper-attack");

    expect(oneGame).toEqual(chopperAttack);
  });

  it("Should return null when the game does not exist", () => {
    expect.assertions(1);

    const oneGame = gameModel.findBySlug("this-game-does-not-exist");

    expect(oneGame).toBeNull();
  });
});

describe("findByPlatform", () => {
  it("Should find games by its platform", () => {
    expect.assertions(1);

    const gameBoyGames = games.filter(
      (game) => game.platform.slug === "game-boy"
    );

    const platformGames = gameModel.findByPlatform("game-boy");

    expect(platformGames.length).toEqual(gameBoyGames.length);
  });

  it("Should return an empty array when the platform does not exist", () => {
    expect.assertions(1);

    const platformGames = gameModel.findByPlatform("not-a-platform");

    expect(platformGames).toEqual([]);
  });
});

describe("getPlatforms", () => {
  it("Should retun platforms", () => {
    expect.assertions(1);

    const platforms = gameModel.getPlatforms()

    expect(platforms.length).toBe(10);
  });

  it("All platforms should have name and slug", () => {
    expect.assertions(1);

    const platforms = gameModel.getPlatforms();

    expect(Object.keys(platforms[0])).toEqual(["name", "slug"]);
  });
});
