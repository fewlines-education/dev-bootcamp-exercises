import initDatabase from "./initDatabase";
import { dropCollections } from "../tests/test-utils";
import { MongoClient } from "mongodb";
import { posts, users } from "../tests/test-data";

let mongoClient: MongoClient;

initDatabase()
  .then(async (client) => {
    mongoClient = client;
    const db = mongoClient.db();
    const collections = await db.listCollections().toArray();
    await dropCollections(
      db,
      collections.map((collection) => collection.name),
    );
    await db.collection("users").insertMany(users);
    await db.collection("posts").insertMany(posts);
    await mongoClient.close();
    console.log("✅ Database reset successfull");
  })
  .catch(async (error) => {
    await mongoClient.close();
    console.log(error);
    console.log("Update canceled");
  });
