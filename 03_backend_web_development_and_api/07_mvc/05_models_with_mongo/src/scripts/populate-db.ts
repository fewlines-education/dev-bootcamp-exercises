import { initDB } from "../init-database";
import games from "./games.json";

initDB().then((client) => {
  return client
    .db()
    .collection("games")
    .drop()
    .then(() => client.db().collection("games").insertMany(games))
    .then(() => {
      client.close();
      console.log("populated");
    });
});
