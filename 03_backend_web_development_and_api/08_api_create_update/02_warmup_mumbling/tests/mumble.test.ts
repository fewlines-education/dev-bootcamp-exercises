import { mumble } from "../src/mumble";

it("Should duplicate letters", () => {
  expect.assertions(5);

  const mumbled = mumble("abcde");

  expect(mumbled).toContain("a");
  expect(mumbled).toContain("bb");
  expect(mumbled).toContain("ccc");
  expect(mumbled).toContain("dddd");
  expect(mumbled).toContain("eeeee");
});

it("Should only have lowercase letters", () => {
  expect.assertions(3);

  const mumbled = mumble("ABC");

  expect(mumbled).toContain("a");
  expect(mumbled).toContain("bb");
  expect(mumbled).toContain("ccc");
})

it("Should separate the letters with dashes", () => {

  expect.assertions(1);

  const mumbled = mumble("AbCjuF");

  expect(mumbled).toBe("a-bb-ccc-jjjj-uuuuu-ffffff");
})
