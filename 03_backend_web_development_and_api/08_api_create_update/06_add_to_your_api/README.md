# Add to your API

## CONTEXT AND OBJECTIVES

It's time to enhance your API from your data.

Add a POST endpoint on `/games` that will add a game to your database.

## SPECS

Your endpoint should validate your data and return a 400 Error if the game you try to add has no `name` or no `slug`.

Otherwise, it should add the data to the database and return a status code of 201.

It should also return the newly added game.

For instance:

```shell-session
$ curl -d '{"name": "A new game", "slug": "a-new-game"}' -H 'Content-Type: application/json' http://localhost:3000/games
{"_id":"6076120963740a7ff491f4e7","name":"A new game","slug":"a-new-game"}%
```

You should add a `create` method on your Model to create the game.

Hint: you can type this methods with `Promise<unknown>`

Hint: once you've created your game, you can use `gameModel.findBySlug` to return it back.
