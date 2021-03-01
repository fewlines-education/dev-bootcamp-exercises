# Github Client

## Context and objectives

In this exercise you have to code what we call a "client".
This Github client will be use to get data about a user and its repositories from the github functions we provide you.

## Specs

We provided you with the bare minimum `GithubClient` class in `src/github-client.ts`.
In this file you also have the `Repo` type you'll need for your client's functions. Use it when you need to type function parameters or return types.

### `getReposUrl`

- Must take a `nickname` string parameter: this is the user we want to search for.
- Must use the `getReposUrlByNickname` function.
- Must return a `Promise<string>`: the url of the requested user's repositories.
- Must **throw** and **catch** an understandable error when the user does not exist.

### `getRepos`

- Must take a `url` string parameter.
- Must use the `listRepos` function that takes an `url` as its argument.
- Must return an array of repositories.

### `getProjectInformations`

- Must take a `url` string parameter.
- Must use the `getOneRepoInfos` function that takes an `url` as its argument.
- Must return the repository's data.

### `printRepository`

- Must take a repository as a parameter.
- Must use `console.log` to print the following repository's information:
  - Repository's name
  - Repository's description
  - Repository's subscribers
  - Repository's stars
  - Repository's language
  - Repository's url

## Tests

Run `yarn test` to test your code.

You also have examples of how this client could be used in the `src/index.ts` file. Feel free to play with it if you want to manually test your functions. You can launch it with `yarn start`.
