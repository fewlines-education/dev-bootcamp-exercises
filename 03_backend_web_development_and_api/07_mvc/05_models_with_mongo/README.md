# Models With Mongos

## CONTEXT AND OBJECTIVES

Let's merge a lot of what you learned in the previous week.

You will link your work of the previous exercises to MongoDB.

## SPECS

### First Step: Create the database

Go to [MongoDB Atlas](https://cloud.mongodb.com) and get the URL of your cluster.

It should look like this: `mongodb+srv://<username>:<password>@<url>/<databaseName>?retryWrites=true&w=majority`.

Change `<databaseName>` to `modelsWithMongo`.

### Second Step: Discover dotenv

Dotenv is a Node.js package that simplify the environment variable by removing the need to source a file.

Create a `.env` file in the same folder as the `package.json` file and put your MongoDB URL like this:

```shell
MONGODB_DATABASE_URL=mongodb+srv://<username>:<password>@<url>/<databaseName>?retryWrites=true&w=majority
```

This file should not be commited to your repository so double check that you have a `.gitignore` file with `.env` in it.

Now, if you need to use environment variables, you can use this snippet of code at the top of your file:

```typescript
import * as dotenv from "dotenv";

dotenv.config();
```

This will load the content of the `.env` file to your environment variables.

### Third step: Populate your database

Running this will add data to your database:

```shell-session
$ yarn run populate-db
```

You should check with MongoDB Atlas or with MongoDB Compass that the data has been loaded.

### Last step: Update your Model

Now that you're here, copy your previous Model (with the promises) and you will be able to update it to use MongoDB.

Before that, look how it is initialized in `src/index.ts`:

```typescript
const gameModel = new GameModel(db.collection("games"));
```

This means that your constructor will receive the MongoDB Collection.
You will be able to use it for all your queries.

As we said in the course, your Model does NOT need to create a database connection, you should have enough with the collection passed in the constructor.

By the way, notice that the `src/server.ts` did not change from the previous exercise, that's the power of the MVC pattern.

This is not an easy exercise, good luck!
