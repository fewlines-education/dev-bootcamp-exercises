import { makeApp } from "../src/server";
import { Server } from "http";
import fetch from "node-fetch";
import games from "../src/games.json";
import { GameModel } from "../src/models/game"

let server: Server;
const gameModel = new GameModel(games)

beforeEach((done) => {
  server = makeApp(gameModel).listen(3030, done);
});

afterEach((done) => {
  server.close(done);
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
