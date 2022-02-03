# Classy Cat

## CONTEXT AND OBJECTIVES

You will have to manipulate classes so it's a good time to practice again.

Let's build a Cat class.

## SPECS

Export a class named `Cat` in the `src/index.ts` file.

This class should take in its constructor a `name`, a `color` and an `age` as three arguments.

These 3 parameters should be public on the class.

It should have a method `purr()` that **returns** a string with that model: `"[name], the cat, purrs..."`.

It should have a method `meow()` that **returns** a string with that model: `"[name], the [color] cat, meows!"`.

It should have a method `attack(withSuccess: boolean)` that **prints** a string:

- `"You've been scratched!"` if `withSuccess` is true,
- `"Wow, [name] missed you, how lucky!"` if `withSuccess` is false.

