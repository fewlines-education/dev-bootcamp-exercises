# Destructure and spread : advanced

## Context and Objectives

Destructuring and spread operators are common when coding with Javascript and it is important to understand how to use them.
In this exercise, you'll practice with some arrays and objects to spread and destructure.

## Write "Prettier" code

Same as in the previous exercises, don't forget to use Prettier to help you format the code!

## Specs

⚠️ You don't always have to code the entire functions in this exercise. You'll get some guidelines in the files like:

```js
/** Complete here */
// Code here
```

### Objects

Code in the `src/index.js` file.

The new IT crew wants to create more compact carts for the customers when delivering. Help them automate it by creating a function that does that for you.

The `getCart` function should take an object as a parameter, override it with the defaut configuration and return it, like this:

```js
let deliveryHell = {
  customer: {
    firstName: "John",
    lastName: "Doe",
  },
  address: {
    street: "221B Baker Street",
    city: "London",
  },
  delivery: {
    package: "ballistic vest",
  },
};

const customerCart = getCart(deliveryHell);

// a customer's cart should look like:
{
  firstName: 'John',
  lastName: "Doe",
  street: "221B Baker Street",
  city: "London",
  package: "ballistic vest",
}
```

The company just had a huge storage glitch and they now need your help to reformat it so they can work again.

Write a `formatStorage` function that takes an `array` as a parameter and returns a formatted array.

It should look like this:

```js
let storageHell = [["ballistic vest", "sword"], [], ["IPad", "IPhone"], ["GameBoy color"], ["Nes", "donkey kong 64"], ["hades pc game"], ["Apex Legends Starter Pack", "LG 5K 27p screen"], ["Levi's jean"], ["Coffee Machine", "Azelad"]];

const formattedStorage = formatStorage(storageHell);

// formattedArray should look like this :
["ballistic vest", "sword", "IPad", "IPhone", "GameBoy color", "Nes", "donkey kong 64", "hades pc game", "Apex Legends Starter Pack", "LG 5K 27p screen", "Levi's jean", "Coffee Machine", "Azelad"]
```
## Tests

You can run `yarn test` at any time to test your code.

Feel also free to add some `console.log()` in the `src/index.js` file to check the result of your code.
