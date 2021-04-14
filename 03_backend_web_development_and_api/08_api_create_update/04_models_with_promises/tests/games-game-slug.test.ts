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
        expect(result).toEqual(randomGame);
      });
  });
});
