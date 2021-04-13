import { GameModel } from "../../src/models/game";
import games from "../../src/games.json";

const gameModel = new GameModel(games);

describe("getAll", () => {
  it("Should get all the games in a Promise", () => {
    expect.assertions(1);

    return gameModel.getAll().then((allGames) => {
      expect(allGames.length).toBe(games.length);
    });
  });

  it("All games should have name, slug and cover", () => {
    expect.assertions(1);

    return gameModel.getAll().then((allGames) => {
      expect(Object.keys(allGames[0])).toEqual(["name", "slug", "cover"]);
    });
  });
});

describe("findBySlug", () => {
  it("Should find a game by its slug and return a Promise of it", () => {
    expect.assertions(1);

    const chopperAttack = games.find((game) => game.slug === "chopper-attack");

    gameModel.findBySlug("chopper-attack").then((oneGame) => {
      expect(oneGame).toEqual(chopperAttack);
    });
  });

  it("Should return null when the game does not exist (but in a Promise)", () => {
    expect.assertions(1);

    gameModel.findBySlug("this-game-does-not-exist").then((oneGame) => {
      expect(oneGame).toBeNull();
    });
  });
});

describe("findByPlatform", () => {
  it("Should find games by its platform and return a Promise with them", () => {
    expect.assertions(1);

    const gameBoyGames = games.filter(
      (game) => game.platform.slug === "game-boy"
    );

    gameModel.findByPlatform("game-boy").then((platformGames) => {
      expect(platformGames.length).toEqual(gameBoyGames.length);
    });
  });

  it("Should return an empty array inside a Promise when the platform does not exist", () => {
    expect.assertions(1);

    gameModel.findByPlatform("not-a-platform").then((platformGames) => {
      expect(platformGames).toEqual([]);
    });
  });
});

describe("getPlatforms", () => {
  it("Should retun platforms in a Promise", () => {
    expect.assertions(1);

    gameModel.getPlatforms().then((platforms) => {
      expect(platforms.length).toBe(10);
    });
  });

  it("All platforms should have name and slug", () => {
    expect.assertions(1);

    gameModel.getPlatforms().then((platforms) => {
      expect(Object.keys(platforms[0])).toEqual(["name", "slug"]);
    });
  });
});
