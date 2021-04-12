import { findMyMaps } from "../src/find-my-maps";

it("Should only return maps", () => {
  expect.assertions(2);

  const result = findMyMaps([
    {
      objectType: "binoculars",
      quantity: 1,
      storedIn: "coat",
      description: "A pair of Binoculars",
    },
    {
      objectType: "chewing_gum",
      quantity: 10,
      storedIn: "front_pocket",
      description: "Fresh mint gum",
    },
    {
      objectType: "map",
      quantity: 1,
      storedIn: "back_pocket",
      description: "Map of Redbeard's treasure",
    },
    {
      objectType: "map",
      quantity: 2,
      storedIn: "coat",
      description: "Fake map that leads nowhere",
    },
  ]);

  expect(result).toEqual([
    {
      objectType: "map",
      quantity: 1,
      storedIn: "back_pocket",
      description: "Map of Redbeard's treasure",
    },
    {
      objectType: "map",
      quantity: 2,
      storedIn: "coat",
      description: "Fake map that leads nowhere",
    },
  ]);

  const result2 = findMyMaps([
    {
      objectType: "binoculars",
      quantity: 1,
      storedIn: "coat",
      description: "A pair of Binoculars",
    },
    {
      objectType: "map",
      quantity: 2,
      storedIn: "coat",
      description: "Fake map that leads nowhere",
    },
    {
      objectType: "chewing_gum",
      quantity: 10,
      storedIn: "front_pocket",
      description: "Fresh mint gum",
    },
  ]);

  expect(result2).toEqual([
    {
      objectType: "map",
      quantity: 2,
      storedIn: "coat",
      description: "Fake map that leads nowhere",
    },
  ]);
});

it("Should also work when there is no maps", () => {
  expect.assertions(1);

  const result = findMyMaps([
    {
      objectType: "binoculars",
      quantity: 1,
      storedIn: "coat",
      description: "A pair of Binoculars",
    },
    {
      objectType: "chewing_gum",
      quantity: 10,
      storedIn: "front_pocket",
      description: "Fresh mint gum",
    },
  ]);

  expect(result).toEqual([]);
});
