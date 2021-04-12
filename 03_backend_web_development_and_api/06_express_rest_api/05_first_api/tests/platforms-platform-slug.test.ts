import { app } from "../src/server";
import { Server } from "http";
import fetch from "node-fetch";
import games from "../src/games.json";

let server: Server;

beforeEach((done) => {
  server = app.listen(3030, done);
});

afterEach((done) => {
  server.close(done);
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
      (game) => (game.platform.slug = randomPlatform)
    );

    return fetch(`http://localhost:3030/platforms/${randomPlatform}`)
      .then((response) => response.json())
      .then((result) => {
        expect(result).toEqual(gamesForThatPlatform);
      });
  });
});
