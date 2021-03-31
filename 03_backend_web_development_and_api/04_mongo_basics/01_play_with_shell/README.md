# PLAY WITH SHELL

## CONTEXT AND OBJECTIVES

First things first, you have to feel comfortable with the basic CRUD operations using the MongoDB Shell.

For the following exercises, do not hesitate to play with [MongoDB shell](https://docs.mongodb.com/manual/tutorial/getting-started/) and then just copy/paste the command in the corresponding file.

## SPECS

Write one command per file, and feel free to add variables when you need it.

#### `createCollection.js`: 

  - write the MongoDB shell command you would use to **create a collection named `worldAtlas`**.

#### `insertOneCountry.js`:

   - write the MongoDB shell command you would use to **insert a country into your `worldAtlas` collection**.

  It must have this structure:

```typescript
{
  name: "France",
  capital: "Paris",
  continent: "Europe",
}
```

#### `insertManyCountries.js`:
  
  - write the MongoDB shell command you would use to **insert at least 2 other countries with one query into your `worldAtlas` collection**.

#### `findOneCountry.js`:

  - write the MongoDB shell command you would use to **query for `Iceland` only**.

#### `findManyCountries.js`:

  - write the MongoDB shell command you would use to **find all the countries from `Europe` in the `worldAtlas` collection**.

#### `updateOneCountry.js`: 

  - write the MongoDB shell command you would use to **replace the capital city of `Australia` by `Canberra`**, instead of currently wrong name `Sydney`.

#### `updateManyCountries.js`:

  - write the MongoDB shell command you would use to **replace all the countries with continent `Europe` by `EU`**.

#### `deleteOneCountry.js`:

  - write the MongoDB shell command you would use to **delete `France`**. (please don't reproduce this in real life)

#### `deleteManyCountries.js`:

  - write the MongoDB shell command you would use to **delete all the `EU` countries**. (neither this)

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
