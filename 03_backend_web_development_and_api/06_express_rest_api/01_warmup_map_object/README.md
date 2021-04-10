# Warmup: Map Object

## CONTEXT AND OBJECTIVES

Create a function that takes an array of objects with more data than needed and returns an array of objects with only the following keys:

- `name` corresponding to the `name` value of the input,
- `slug` corresponding to the `slug` value of the input and
- `cover` corresponding to the `url` value of the `cover` input.

## SPECS

In `src/game-mapper.ts`, complete the `gameMapper` function using the `Array.map` function.

Hint: Look at the types of `GameWithALotOfData` and `Game`, your function should transform the first one to the into the second one.
