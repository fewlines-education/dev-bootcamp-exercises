import * as mongo from "mongodb";
import * as dotenv from "dotenv";

dotenv.config();

const databaseUrl = process.env.MONGODB_DATABASE_URL || "";
const options = { useNewUrlParser: true, useUnifiedTopology: true };

export function initDB(): Promise<mongo.MongoClient> {
  return mongo.MongoClient.connect(databaseUrl, options);
}
