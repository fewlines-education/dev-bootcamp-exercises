# Warmup: Lottery draw (context)

## CONTEXT AND OBJECTIVES

You are asked to create a function that compares a lottery ticket (an `array` of 6 numbers, between 0 and 100 included) and tells you if you have won the lottery or not!

## SPECS

The function you need to code is in `src/context.ts`.

Write a function with the following specifications:

- It takes a parameter of type `Draw` which is an array of 6 numbers.
- It doesn't return anything.
- It generates a random array with the function `lottery_draw` from the first exercise.
- If the parameter and the random array have the same numbers **in the exact same order**:
  - Console log "You won the lottery!".
- Else :
  - Console log "You lost...".

## EXAMPLES

```js
context([26, 16, 41, 32, 66, 42])
// If you win, it console logs "You won the lottery!"
// If you loose, it console logs "You lost..." 
```

You can use `yarn start` to check that you have the right result:

```shell-session
$ yarn start 
```
