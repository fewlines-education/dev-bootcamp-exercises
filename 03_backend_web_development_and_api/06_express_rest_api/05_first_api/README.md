# Your first API

## CONTEXT AND OBJECTIVES

This time, you will create the basis of a true API.
We will work on it during this week and it will be a Video Games API.

Data will be provided throughout the week so, you will not be responsible for that, we will give you JSON files with all the games data you need.

For today, you will create the first endpoints and will be able to query your API.

## SPECS

**👉 First step**

First, you must reuse the same architecture as the previous exercise with `index.ts` and `server.ts`.
You can copy the `index.ts` from there.

> ⚠️ No test will pass if you don't do this step

**👉 Second step**

Tests are separated by endpoint, if you look inside the `tests` folder.

This is to help you try your application with more serenity.

You can launch only one file at a time with:

```shell-session
$ yarn test tests/games-game-slug.test.ts
```

Don't forget to launch the whole test suite from time to time with `yarn test`!

---

```
| Endpoint                  | HTTP Method | Response Content-Type | Response value               |
|---------------------------|-------------|-----------------------|------------------------------|
| /                         | 400         | application/json      | { "error": "Wrong resource"} |
| /games                    | 200         | application/json      | Game[]                       |
| /games/:game_slug         | 200 or 404  | application/json      | Game                         |
| /platforms/:platform_slug | 200 or 404  | application/json      | Game[]                       |
| /platforms                | 200         | application/json      | Platform[]                   |
```

### `/` endpoint

This endpoint will return an error with a 400 HTTP Method and must return:

```json
{ "error": "Wrong resource" }
```

### `/games` endpoint

This endpoint is the main endpoint of the API where you will return the whole list of games.

Beware though that since it returns a bunch of data, it must not return the full dataset of a game.
It should only return the game name, slug and cover.

It should return with a 200 and an array of game objects.

Note that you can import a JSON file as if it was code with:

```typescript
import games from "./games.json";
```

### `/games/:game_slug` endpoint

This endpoint will return all the data that you have for one game.

It should return a 200 and an object representing a game.

In the case of a non existing slug though, it should return a 404 with no body.

### `/platforms/:platform_slug` endpoint

This endpoint will return all the games corresponding to the `platform_slug` in the URL.

It should work as the `/games` endpoint but with a smaller list and every game should have the same platform.

It should return a 200 and an array of game objects.

### `/platforms` endpoint

This endpoint is the trickiest one with the dataset you have.
Since you only have games that have a platform each, you will need to create a list of all the platforms, without duplicates.

It should return the list of all the platforms with their `name` and `slug` values.

It should return a 200 and an array of platform objects.
