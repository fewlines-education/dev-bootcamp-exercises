import express from "express";
import * as core from "express-serve-static-core";
import { GameModel } from "./models/game";

export function makeApp(gameModel: GameModel): core.Express {
  const app = express();

  app.get("/", (request, response) => {
    response.status(400).json({ error: "Wrong resource" });
  });

  app.get("/games", (request, response) => {
    response.json(gameModel.getAll());
  });

  app.get("/games/:game_slug", (request, response) => {
    const game = gameModel.findBySlug(request.params.game_slug)

    if (!game) {
      response.status(404).end();
    } else {
      response.json(game);
    }
  });

  app.get("/platforms", (request, response) => {
    const platforms = gameModel.getPlatforms()

    response.json(platforms);
  });

  app.get("/platforms/:platform_slug", (request, response) => {
    const gamesForPlatform = gameModel.findByPlatform(request.params.platform_slug)

    response.json(gamesForPlatform);
  });

  return app;
}
