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
