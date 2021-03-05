import fetch, { Response } from "node-fetch";

type Joke = {
  value: string;
};

export const getChuckCategories = (): Promise<string[]> => {
  return fetch("https://api.chucknorris.io/jokes/categories").then((response: Response) => response.json());
};

export const getChuckJoke = (category: string): Promise<Joke> => {
  return fetch(`https://api.chucknorris.io/jokes/random?category=${category}`).then((response: Response) =>
    response.json(),
  );
};
