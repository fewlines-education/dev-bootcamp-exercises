import { initDB } from "../init-database";
import games from "./games.json";

initDB().then((client) => {
  return client
    .db()
    .collection("games")
    .drop()
    .catch(() => {
      console.log("No games collection found, creating one...");
    })
    .then(() => client.db().collection("games").insertMany(games))
    .then(() => {
      client.close();
      console.log("populated");
    });
});
