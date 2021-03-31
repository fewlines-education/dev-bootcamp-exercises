import * as mongoDb from "mongodb";
import { dropAll } from "./test-utils";
import searchWithPagination from "../src/searchWithPagination";
import dataImport from "../utils/dataImport";
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

describe("#searchWithPagination", () => {
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
    if (db) {
      await dropAll(db);
      await dataImport(db);
    }
  });
  beforeEach(async () => {});
  afterAll(async () => {
    if (db) {
      await dropAll(db);
    }
    if (client) {
      await client.close();
    }
  });

  it("Should have all requested properties", async () => {
    const data = await searchWithPagination(db, { query: { name: /mario/i }, page: 1, resultsPerPage: 20 });
    const requiredKeys = ["currentPage", "pageCount", "results", "resultsPerPage", "totalCount"];
    const dataKeys = Object.keys(data).sort();

    expect(dataKeys).toEqual(requiredKeys);
  });

  test("Each property should have the correct type of value", async () => {
    const query = { name: /mario/i };
    const count = await db.collection("games").find(query).count();
    const requestedPage = 2;
    const itemsPerPage = 20;
    const numberOfPage = Math.ceil(count / itemsPerPage);

    const data = await searchWithPagination(db, { query, page: requestedPage, resultsPerPage: itemsPerPage });
    const { currentPage, pageCount, results, resultsPerPage, totalCount } = data;

    expect(currentPage).toBe(requestedPage);
    expect(pageCount).toBe(numberOfPage);
    expect(Array.isArray(results)).toBeTruthy();
    expect(results).toHaveLength(16);
    expect(resultsPerPage).toEqual(20);
    expect(totalCount).toBe(count);
  });

  it("Should have 2 pages of 'Mario' games when 20 results per page", async () => {
    const data = await searchWithPagination(db, { query: { name: /mario/i }, page: 1, resultsPerPage: 20 });
    expect(data.pageCount).toBe(2);
  });

  it("Should have 36 'Mario' games", async () => {
    const data = await searchWithPagination(db, { query: { name: /mario/i }, page: 1, resultsPerPage: 1000 });
    expect(data.results).toHaveLength(36);
  });
});
