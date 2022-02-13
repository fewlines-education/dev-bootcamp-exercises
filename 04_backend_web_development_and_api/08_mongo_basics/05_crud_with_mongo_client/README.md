# CRUD WITH MONGODB CLIENT

## CONTEXT AND OBJECTIVES

For this exercise you will write a script able to interact with the `MongoDB Client`.

We provide you an existing database with a collection `worldAtlas` already populated with some countries.

As a reminder, a country structure looks like:

```typescript
{
  name: "France",
  capital: "Paris",
  continent: "Europe",
}
```

The goal is to perform the same CRUD operations as the previous exercise, but this time using **only** `NodeJS` and `MongoDB client`.

## SPECS

You have to code each operation in separated files:

- `findOneCountry.ts`:

  Find `Iceland` in the `worldAtlas` collection and return it.

- `findManyCountries.ts`:

  Find all the countries from `Europe` in the `worldAtlas` collection and return them as an `array` of countries.

- `insertOneCountry.ts`:

  Insert a country into your `worldAtlas` collection and return it. **⚠️ you must pick it from the query return**

- `insertManyCountries.ts`:

  Insert at least 2 other countries (with one `insertMany` query) into your `worldAtlas` collection and return them as an `array` of countries. **⚠️ you must pick them from the query return**

- `updateOneCountry.ts`:

  Replace the capital of `Australia` by `Canberra` and return it.
  > 🔎 for this one you are allowed to query the database

- `updateManyCountries.ts`:

  Replace all the countries with continent `Europe` by `EU` and return them as an `array` of countries.
  > 🔎 for this one you are allowed to query the database

- `deleteOneCountry.ts`:

  Delete `France` from the `worldAtlas` collection. It will return `true` in case of success, `false` otherwise.
  > 🔎 success feedback can be found in the query return: if `deleteCount === 1` it means the deletion was successful

- `deleteManyCountries.ts`:

  Delete all the `European` countries from the `worldAtlas` collection. It will return `true` in case of success, `false` otherwise.
 > 🔎 success feedback can be found in the query return: if `result.n === deleteCount` and `deleteCount > 0` it means the deletion was successful

Each of those functions should take a `mongo.Db` as argument.

**⚠️ Don't forget about your types**, you can create and use as many as you need.

To execute your code, import your query function in `index.ts`, place it instead of `showCollections`, and then run `yarn start`.

> Do not hesitate to check manually your DB: `mongo mongo-basics -u mongo-basics-app -p password` (the Database is reset each time you run `yarn start`).

## MONGODB DATABASE URL

Don't forget to:

- 1️⃣ Create a `.env_vars` file
- 2️⃣ **BE EXTRA SURE** that it is added to your `.gitignore` file to avoid revealing your password on Github on a push.
- 3️⃣ add the database url in the `.env_vars` file:

  ```bash
  export MONGODB_DATABASE_URL='<your-mongo-db-atlas-url>'
  ```
  > Change the placeholder with your own url.

- 4️⃣ source your file:

  ```bash
  source .env_vars
  ```
