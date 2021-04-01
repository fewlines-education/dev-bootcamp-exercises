import { dropAll } from "../tests/test-utils";
import { initDatabase } from "./getDatabaseUrl";

initDatabase()
  .then(async (client) => {
    await dropAll(client.db());
    client.close();
  })
  .catch(console.error);
