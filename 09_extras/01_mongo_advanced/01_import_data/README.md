# Import data

Importing data from a json file is a quite common task to do. Then we often need to store the imported data in a database.

## Specs

Look in the `data` folder. You will find some json files containing a game console and its games! (Your computer may have hard time open it since it's a big file)

Each platform has many keys and one of them is the games related to it, pretty much like this:

```js
{
  id: 24,
  abbreviation: "GBA",
  alternative_name: "GBA",
  name: "Game Boy Advance",
  platform_logo: {...},
  slug: "gba",
  versions: [...],
  games: [...], // 👈
  // and additional keys that doesn't matter for now
};
```

A game is formed like this:

```js
{
  id: 49314,
  name: "some game title",
  platforms: [24],
  collection: {...},
  release_dates: [...],
  first_release_date: 1033603200,
  cover: {...},
  genres: [...],
  // and additional keys that doesn't matter for now
};
```

### Read data from files

In the `src/dataImport.ts`, code a function that read data from the `.json` files in the `data` folder.
To do that, you can use:

```typescript
const fileName = "the name of the file";
const filePath = path.resolve(`data/${fileName}`);
const stringifiedPlatform = fs.readFileSync(filePath, "utf-8");
const platform = JSON.parse(stringifiedPlatform);
```
> Try this code to see it in action!

### Write data in database

When you have the three platforms, it's time to add data in the MongoDb database.

We want to create two collections:
- one `platforms` collection.
- one `games` collection.

One thing to have in mind tho: don't write games two times in the db! (one time in the games collection and one time inside the platforms).

You should **extract the `games` key of the platforms** and add them into one `games` collection.

## Tests

Run tests with `yarn test`.

## MONGODB DATABASE URL

Don't forget to:

- 1️⃣ Create a `.env_vars` file
- 2️⃣ **BE EXTRA SURE** that it is added to your `.gitignore` file to avoid revealing your password on Github on a push.
- 3️⃣ add the database url in the `.env_vars` file:

  ```bash
  export MONGODB_DATABASE_URL=<your-mongo-db-atlas-url>
  ```
  > Change the placeholder with your own url.

- 4️⃣ source your file:

  ```bash
  source .env_vars
  ```
