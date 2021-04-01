import {rectangle} from "../src/rectangle"

it("Should return rectangles", () => {
  expect.assertions(3);

  expect(rectangle(2, 2)).toBe("**\n**\n")
  expect(rectangle(5, 4)).toBe("*****\n*****\n*****\n*****\n")
  expect(rectangle(4, 3)).toBe("****\n****\n****\n")
})
