import { makeApp } from "../src/server";
import { Server } from "http";
import fetch from "node-fetch";
import { GameModel } from "../src/models/game"
import { initDB } from "../src/init-database";
import { MongoClient } from "mongodb";

let server: Server;
let mongoClient: MongoClient;

beforeEach((done) => {
  initDB().then((client) => {
    mongoClient = client;
    const db = client.db();
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
