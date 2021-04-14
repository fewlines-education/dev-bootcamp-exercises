# Models

## CONTEXT AND OBJECTIVES

Continuing from previous exercise, you have to make the Model work with Promises.

## SPECS

Look at `src/server.ts` to see how the Model is used now with Promises.

Copying your Model from the previous exercise in `src/models/game.ts`, you must change those methods to now return a Promise of what they returned:

- `getAll`
- `findBySlug`
- `findByPlatform`
- `getPlatforms`

Hint: `Promise.resolve(something)` will return a promisified version of whatever `something` is.
