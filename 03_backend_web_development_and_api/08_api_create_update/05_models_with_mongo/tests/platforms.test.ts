import { makeApp } from "../src/server";
import { Server } from "http";
import fetch from "node-fetch";
import { GameModel } from "../src/models/game"
import { initDB } from "../src/init-database";
import { MongoClient } from "mongodb";
import games from "../src/scripts/games.json"

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

describe("/platforms endpoint", () => {
  it("Should respond with a 200 HTTP code", () => {
    expect.assertions(1);

    const randomPlatform =
      games[Math.floor(Math.random() * games.length)].platform.slug;

    return fetch(`http://localhost:3030/platforms`).then(
      (response) => {
        expect(response.status).toBe(200);
      }
    );
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
        const deduplicatedResult = Array.from(new Set(result))

        expect(deduplicatedResult).toEqual(result);
      });
  });
});
