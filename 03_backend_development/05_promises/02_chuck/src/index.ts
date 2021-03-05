import { closeRl, ask } from "../interface";
import { getCategories, getJoke } from "./chuck";

function printCategories(categories: string[]): void {
  console.log(
    categories
      .map((category, i) => {
        const categoryNumber = (i + 1).toString().padStart(2, " ");
        return `${categoryNumber} - ${category}`;
      })
      .join("\n"),
  );
}

getCategories()
  .then((categories) => {
    printCategories(categories);
    ask("Choose a category number\n> ")
      .then((input) => getJoke(categories[parseInt(input) - 1]))
      .then((joke) => {
        console.log(joke);
        closeRl();
      });
  })
  .catch((e) => console.warn(e));
