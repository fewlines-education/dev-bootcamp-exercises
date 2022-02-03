import { slugger, sluggerWithUnderscores } from "../src/slugger"

describe("slugger", () => {

  it("Should replace special characters with dashes", () => {
    expect.assertions(2);

    expect(slugger("This is a string")).toBe("This-is-a-string")

    expect(slugger("This is another string!")).toBe("This-is-another-string!")
  })

})

describe("sluggerWithUnderscores", () => {
  it("Should do the same as slugger but with underscores instead of dashes", () => {
    expect.assertions(2);

    expect(sluggerWithUnderscores("This is a string")).toBe("This_is_a_string")

    expect(sluggerWithUnderscores("This is another string!")).toBe("This_is_another_string!")

  })
})
