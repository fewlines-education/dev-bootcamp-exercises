import * as dotenv from "dotenv";
import { GameModel } from "./models/game";
import games from "./games.json"
import { makeApp } from "./server"


dotenv.config();

const PORT = process.env.PORT || 3000;

const gameModel = new GameModel(games);

const app = makeApp(gameModel);

app.listen(PORT, () => {
  console.log(`Server successfully started on http://localhost:${PORT}`);
});
