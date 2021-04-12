# Pagination and query

## Context and objectives

Look at different e-commerce websites. When we search for products, we don't get the whole list on a single page! We will have 10, 20 products per page, and the total count of products divided by the number of products per page will result in the number of page.

That's what we call _pagination_.

## Specs

You need to complete the `searchWithPagination` function in `src/searchWithPagination.ts`.

You are provided with types, already written at the top of the file and the function is also already typed to help you code it. What it tells you is what the functions takes as parameter (and their type) and what is should return.

For example, calling the function like this:

```typescript
const query = { name: /mario/i };
const page = 2;
const resultsPerPage = 20;

searchWithPagination(db, { query, page, resultsPerPage }).then((data) => {
  console.log(data);
  client.close();
});
```

Will print something like that:

```typescript
{
  totalCount: 36,
  resultsPerPage: 20,
  currentPage: 2,
  pageCount: 2,
  results: [
    // Here are your games!
    { ... },
    { ... },
    { ... },
    { ... },
  ]
}
```
> We know that we have **36 `mario` games**. The results are split in **2 pages**, so first and second pages count 20 results, the second one count 16.

⚠️⚠️ Use the types given to you to help you code the function 😉.

## Tests

As usual, use `yarn test` to test and `yarn start` to manually test 😎.

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
