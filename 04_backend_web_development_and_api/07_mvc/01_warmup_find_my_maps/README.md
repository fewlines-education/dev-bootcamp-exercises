# Find my maps

## CONTEXT AND OBJECTIVES

Have you ever played a Point & Click game like Monkey Island? If not, give it a try after the bootcamp or someday!

In this kind of game, you often have a lot of things in our inventory.

You need to create a function that will return only the maps from a list of objects.

## SPECS

Using `Array.filter`, you need to complete the `findMyMaps` function in `src/find-my-maps.ts`.

You will receive a list of `Object` as input, for instance:

```typescript
[
  { objectType: "binoculars", quantity: 1, storedIn: "coat", description: "A pair of Binoculars" },
  { objectType: "chewing_gum", quantity: 10, storedIn: "front_pocket", description: "Fresh mint gum" },
  { objectType: "map", quantity: 1, storedIn: "back_pocket",  description: "Map of Redbeard's treasure" },
  { objectType: "map", quantity: 2, storedIn: "coat", description: "Fake map that leads nowhere" },
]
```

From this, you need to return only the objects with `objectType: "map"`.
