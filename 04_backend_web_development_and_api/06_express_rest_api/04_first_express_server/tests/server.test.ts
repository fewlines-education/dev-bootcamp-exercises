import { app } from "../src/server";
import { Server } from "http";
import fetch from "node-fetch";

let server: Server;

beforeEach((done) => {
  server = app.listen(3030, done);
});

afterEach((done) => {
  server.close(done);
});

describe("/ endpoint", () => {
  it("Should respond with a 200 HTTP code", () => {
    expect.assertions(1);

    return fetch("http://localhost:3030/").then((response) => {
      expect(response.status).toBe(200);
    });
  });

  it("Should respond with OK", () => {
    expect.assertions(1);

    return fetch("http://localhost:3030/")
      .then((response) => response.text())
      .then((result) => {
        expect(result).toBe("OK");
      });
  });
});
