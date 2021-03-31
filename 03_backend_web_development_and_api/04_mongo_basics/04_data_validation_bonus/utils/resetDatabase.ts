import { dropAll } from "../tests/test-utils";
import { initDatabase } from "./initDatabase";

initDatabase()
  .then(async (client) => {
    await dropAll(client.db());
    client.close();
  })
  .catch(console.error);
