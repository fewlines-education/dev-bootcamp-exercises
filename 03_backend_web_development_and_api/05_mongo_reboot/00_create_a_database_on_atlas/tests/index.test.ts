import { dropAll, execP } from "./test-utils";
import * as mongoDb from "mongodb";
import * as fs from "fs";
import * as path from "path";
import { getDatabaseUrl } from "../utils/getDatabaseUrl";

const databaseUrl = getDatabaseUrl({ testEnvironment: true });

const baseOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000,
};

async function initDatabase(): Promise<mongoDb.MongoClient> {
  return new Promise((resolve, reject) => {
    mongoDb.MongoClient.connect(databaseUrl, baseOptions, async (error, client) => {
      if (error) {
        reject(error);
      } else {
        resolve(client);
      }
    });
  });
}

jest.setTimeout(20000);

describe("Create a database on Atlas", () => {
  let client: mongoDb.MongoClient;
  let db: mongoDb.Db;

  beforeAll(async () => {
    try {
      client = await initDatabase();
      db = client.db("mongo-basics");
    } catch (error) {
      console.warn(error);
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

  if (fs.existsSync(path.resolve(".env_vars"))) {
    describe("'.env_vars'", () => {
      it("Should be populated with the database url", () => {
        const file = fs.readFileSync(path.resolve(".env_vars"), "utf-8");
        const match = file.match(
          /export (?<variableName>MONGODB_DATABASE_URL)=(?<url>mongodb\+srv:\/\/(?<username>.+):(?<password>.+)@.*)/,
        );
        if (match) {
          const { groups } = match;
          expect(groups.variableName).toBe("MONGODB_DATABASE_URL");
        }
      });

      test("Should have been sourced with 'source .env_vars' in the terminal", () => {
        const file = fs.readFileSync(path.resolve(".env_vars"), "utf-8");
        const match = file.match(
          /export (?<variableName>MONGODB_DATABASE_URL)=('|")(?<url>mongodb\+srv:\/\/(?<username>.+):(?<password>.+)@.*)('|")/,
        );
        if (match) {
          const { groups } = match;
          expect(process.env.MONGODB_DATABASE_URL).toBe(groups.url);
        }
      });
    });
  }

  describe("Contact the Atlas cluster", () => {
    it("Should create a 'test' collection in the DB", async () => {
      expect.assertions(2);

      await db.createCollection("test");

      const collections = await db.listCollections().toArray();

      expect(collections.length).toBe(1);
      expect(collections[0].name).toBe("test");
    });
  });
});
