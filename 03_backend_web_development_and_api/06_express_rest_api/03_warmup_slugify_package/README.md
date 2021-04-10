# Warmup: Slugify Package

## CONTEXT AND OBJECTIVES

Create two functions that _slugify_ a string.

_slugifying_ is the process of transforming a string to a URL readable one, meaning a string that can be inside an URL.
It's often used for resource names in URL to have for instance `http://my-website.com/articles/my-first-post` instead of `http://my-website.com/articles/My%20first%20post` (spaces in URL are replaced by `%20`).

## SPECS

In `src/slugger.ts`, export two functions named `slugger` and `sluggerWithUnderscores` that will both use the `slugify` package (read the [`slugify` documentation](https://www.npmjs.com/package/slugify)).

As the names suggest, the first function will only return a slugified version of its input; the second one will do the same but use the underscore character `_` instead of the dash `-`.
