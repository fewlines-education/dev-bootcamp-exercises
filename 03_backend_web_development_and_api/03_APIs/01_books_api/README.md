# Book API

## Context and objectives

In this exercise you will have to code functions to consume the given **Book API**. But for this, you'll first have to read its documentation.

## Book API documentation

### Database Schema

![](./assets/images/book-api.png)

Resources:

- Authors:
  - Each author have written several books.
- Books:
  - Each book have been written by one author.
  - Each book may have several comments written by one user.
- Users:
  - Each user may have written several comments on different books.
- Comments
  - Each comment have been written by one user.
  - Each comment is linked to one book.

### Routes

```bash
# Authors
GET /authors # all authors
GET /authors/:id # one author by id
GET /authors/:id/books # author's books
GET /authors?q=<name> # authors by name

# Books
GET /books # all books
GET /books/:id # one book by id
GET /books/:id/comments # book's comments
GET /books?q=<name> # books by name

# Users
GET /users # all users
GET /users/:id # on user by id
GET /users/:id/comments # user's comments
POST /users # creates one user
PATCH /users/:id # update one user by id
DELETE /users/:id # delete one user by id
```

### User creation

In order to create a user you will need to make a `POST` request to `/users` with the following body:

```bash
{
  name: <userName>
}
```

### User update

In order to update a user you will need to make a `PATCH` request to `/users/:id` with following body:

```bash
{
  name: <userName>
}
```

## Specs

To complete this exercise you will have to write all needed requests.

**This is a lot of code to write**. But hey! It's time to really use the developper's best friend: `COPY / PASTE`!!

### Repositories

In the `src/repositories` folder you have three files to write code in:

- `AuthorRepository.ts`
- `BookRepository.ts`
- `UserRepository.ts`

As you can guess, each file contains a `class` and is dedicated to a specific resource. In each one, you'll have to code functions on this model:

```ts
import fetch from "node-fetch";

class Repository {
  baseUrl = process.env.BASE_URL;

  neededFunction(parameter: ParameterType): FunctionReturnType {
    // Needed code to make the function work properly
  }

  OtherNeededFunction(parameter: ParameterType): FunctionReturnType {
    // Needed code to make the function work properly
  }
}

export { Repository };
```

#### AuthorRepository

code the following functions:

**`getAll`**

get all authors.
function parameters:

**`getOne`**

get one author by id.
function parameters:

- `id`: number.

**`getAuthorBooks`**

get all books for one author.
function parameters:

- `id`: number.

**`searchByName`**
get authors by name.
function parameters:

- `term`: string.

#### BookRepository

code the following functions:

**`getAll`**

get all books.
function parameters:

**`getOne`**

get one book by id.
function parameters:

- `id`: number.

**`getBookComments`**

get all comments for one book.
function parameters:

- `id`: number.

**`searchByName`**

get authors by name.
function parameters:

- `term`: string.

#### UserRepository

code the following functions:

**`getAll`**

get all users.
function parameters:

**`getOne`**

get one user by id.
function parameters:

- `id`: number.

**`getUserComments`**

get all comments written by one user.
function parameters:

- `id`: number.

**`create`**

Create a user.
function parameters:

- `params`: object.

**`update`**

Update a specific user.
function parameters:

- `id`: number.
- `params`: object.

**`delete`**

Delete a specific user.
function parameters:

- `id`: number.

### Constraints

**Request**

You **must** use the `node-fetch` package inside your functions.

Here is the **[documentation](https://www.npmjs.com/package/node-fetch)**. (Spoiler: You'll need to read it for `POST` and `PATCH` requests)

Don't forget to `return` the promise of your result.

### Setup

The API is not on a distant server, it's right here, in your folder. To start it:

```bash
# get the process.env.BASE_URL available in your code
source .env_vars

# start the server
yarn start # => http://localhost:9999
```

⚠️ You'll need to let it turned on, so start it in a new terminal window.

### Tests

To launch tests, just `yarn test`.
