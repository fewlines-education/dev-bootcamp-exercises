import { findMyMaps } from "./find-my-maps";

console.log(
  findMyMaps([
    { objectType: "binoculars", quantity: 1, storedIn: "coat", description: "A pair of Binoculars" },
    { objectType: "chewing_gum", quantity: 10, storedIn: "front_pocket", description: "Fresh mint gum" },
    { objectType: "map", quantity: 1, storedIn: "back_pocket",  description: "Map of Redbeard's treasure" },
    { objectType: "map", quantity: 2, storedIn: "coat", description: "Fake map that leads nowhere" },
  ])
);

