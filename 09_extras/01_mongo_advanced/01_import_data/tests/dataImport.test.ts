import * as mongoDb from "mongodb";
import { dropAll } from "./test-utils";
import dataImport from "../src/dataImport";

import { getDatabaseUrl } from "../utils/initDatabase";

const testDatabaseUrl = getDatabaseUrl({ testEnvironment: true });

const testOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000,
};

async function initTestDatabase(): Promise<mongoDb.MongoClient> {
  return new Promise((resolve, reject) => {
    mongoDb.MongoClient.connect(testDatabaseUrl, testOptions, async (error, client) => {
      if (error) {
        reject(error);
      } else {
        resolve(client);
      }
    });
  });
}

describe("#importData", () => {
  let client: mongoDb.MongoClient;
  let db: mongoDb.Db;

  beforeAll(async () => {
    jest.setTimeout(20000)
    try {
      client = await initTestDatabase();
      db = client.db();
    } catch (error) {
      console.warn(error);
      console.error("Can't log to MongoDB Server, did you start it?");
    }
  });
  beforeEach(async () => {
    if (db) {
      await dropAll(db);
    }
  });
  afterAll(async () => {
    if (db) {
      await dropAll(db);
    }
    if (client) {
      await client.close();
    }
  });

  it("Should add games and platforms collections to the database", async () => {
    expect.assertions(1);
    await dataImport(db);
    const collections = await db.listCollections().toArray();
    const collectionsNames = collections.map((collection) => collection.name);
    expect(collectionsNames.sort()).toEqual(["games", "platforms"]);
  });

  it("Should add 1270 games to the 'games' collection", async () => {
    await dataImport(db);
    const games = await db.collection("games").find();
    const counter = await games.count();
    expect(counter).toBe(1270);
  });

  it("Should add 2 platforms to the 'platforms' collection", async () => {
    await dataImport(db);
    const platforms = await db.collection("platforms").find();
    const counter = await platforms.count();
    expect(counter).toBe(2);
  });

  test("Platforms must not contain any games", async () => {
    await dataImport(db);
    const platforms = await db.collection("platforms").find().toArray();

    expect.assertions(platforms.length);

    platforms.forEach((platform) => {
      expect(Object.keys(platform)).not.toContain("games");
    });
  });
});
