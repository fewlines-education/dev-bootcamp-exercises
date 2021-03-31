import { dropAll } from "../tests/test-utils";
import { initDatabase } from "../../03_data_validation/utils/initDatabase";

initDatabase()
  .then(async (client) => {
    await dropAll(client.db());
    client.close();
  })
  .catch(console.error);
