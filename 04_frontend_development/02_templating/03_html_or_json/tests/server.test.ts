import { makeApp } from "../src/server";
import { Server } from "http";
import fetch from "node-fetch";
import { GameModel } from "../src/models/game";
import { initDB } from "../src/init-database";
import { MongoClient } from "mongodb";
import games from "../src/scripts/games.json";

let server: Server;
let mongoClient: MongoClient;

beforeEach((done) => {
  initDB()
  .then((client) => {
    mongoClient = client;
  })
  .then(() => mongoClient.db().collection("games").drop().catch(() => {}))
  .then(() => mongoClient.db().collection("games").insertMany(games))
  .then(() => {
    const db = mongoClient.db();
    const gameModel = new GameModel(db.collection("games"));

    const app = makeApp(gameModel);
    server = makeApp(gameModel).listen(3030, done);
  });
});

afterEach((done) => {
  mongoClient.close().then(() => {
    server.close(done);
  });
});

describe("/ endpoint", () => {
  it("Should respond with a 400 HTTP code", () => {
    expect.assertions(1);

    return fetch("http://localhost:3030/").then((response) => {
      expect(response.status).toBe(400);
    });
  });

  it("Should respond with a JSON error", () => {
    expect.assertions(1);

    return fetch("http://localhost:3030/")
      .then((response) => response.json())
      .then((result) => {
        expect(result).toEqual({ error: "Wrong resource" });
      });
  });
});

describe("/games endpoint", () => {
  it("Should respond with a 200 HTTP code", () => {
    expect.assertions(1);

    return fetch("http://localhost:3030/games").then((response) => {
      expect(response.status).toBe(200);
    });
  });

  it("Should return an array of games", () => {
    expect.assertions(2);

    return fetch("http://localhost:3030/games")
      .then((response) => response.json())
      .then((result) => {
        expect(Array.isArray(result)).toBe(true);

        expect(Object.keys(result[0])).toEqual(["name", "slug", "cover"]);
      });
  });
});

describe("/games/:game_slug endpoint", () => {
  it("Should respond with a 200 HTTP code when the game exist", () => {
    expect.assertions(1);
    const randomGame = games[Math.floor(Math.random() * games.length)];

    return fetch(`http://localhost:3030/games/${randomGame.slug}`).then(
      (response) => {
        expect(response.status).toBe(200);
      }
    );
  });

  it("Should respond with a 404 HTTP code when the game exist", () => {
    expect.assertions(1);

    return fetch(
      "http://localhost:3030/games/this-game-should-not-exist-really"
    ).then((response) => {
      expect(response.status).toBe(404);
    });
  });

  it("Should return a game object", () => {
    expect.assertions(1);
    const randomGame = games[Math.floor(Math.random() * games.length)];

    return fetch(`http://localhost:3030/games/${randomGame.slug}`)
      .then((response) => response.json())
      .then((result) => {
        expect(result.name).toBe(randomGame.name);
      });
  });
});

describe("/platforms/:platform_slug endpoint", () => {
  it("Should respond with a 200 HTTP code", () => {
    expect.assertions(1);

    const randomPlatform =
      games[Math.floor(Math.random() * games.length)].platform.slug;

    return fetch(`http://localhost:3030/platforms/${randomPlatform}`).then(
      (response) => {
        expect(response.status).toBe(200);
      }
    );
  });

  it("Should always respond with an array", () => {
    expect.assertions(1);

    const randomPlatform =
      games[Math.floor(Math.random() * games.length)].platform.slug;

    return fetch(`http://localhost:3030/platforms/this-platform-does-not-exist`)
      .then((response) => response.json())
      .then((result) => {
        expect(result).toEqual([]);
      });
  });

  it("Should return games corresponding to the platform", () => {
    expect.assertions(1);

    const randomPlatform = games[0].platform.slug;
    const gamesForThatPlatform = games.filter(
      (game) => game.platform.slug === randomPlatform
    );

    return fetch(`http://localhost:3030/platforms/${randomPlatform}`)
      .then((response) => response.json())
      .then((result) => {
        expect(result.length).toEqual(gamesForThatPlatform.length);
      });
  });
});

describe("/platforms endpoint", () => {
  it("Should respond with a 200 HTTP code", () => {
    expect.assertions(1);

    const randomPlatform =
      games[Math.floor(Math.random() * games.length)].platform.slug;

    return fetch(`http://localhost:3030/platforms`).then((response) => {
      expect(response.status).toBe(200);
    });
  });

  it("Should return an array of platforms", () => {
    expect.assertions(2);

    return fetch("http://localhost:3030/platforms")
      .then((response) => response.json())
      .then((result) => {
        expect(Array.isArray(result)).toBe(true);

        expect(Object.keys(result[0])).toEqual(["name", "slug"]);
      });
  });

  it("Should have no duplicates", () => {
    expect.assertions(1);

    return fetch("http://localhost:3030/platforms")
      .then((response) => response.json())
      .then((result) => {
        const deduplicatedResult = Array.from(new Set(result));

        expect(deduplicatedResult).toEqual(result);
      });
  });
});
