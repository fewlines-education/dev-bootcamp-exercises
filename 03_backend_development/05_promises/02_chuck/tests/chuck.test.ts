jest.mock("node-fetch", () => require("fetch-mock-jest").sandbox());
const fetch = require("node-fetch");
import { getCategories, getJoke } from "../src/chuck";

describe("Promisified Chuck", () => {
  afterEach(() => fetch.reset());

  describe("#getCategories", () => {
    it("Must use getChuckCategories", () => {
      expect.assertions(1);
      fetch.once(/\w*/, {});
      const getChuckCategories = fetch

      getCategories();
      expect(getChuckCategories.called()).toBe(true);
    });

    it("Must return an array of categories", () => {
      expect.assertions(1);
      const chuckCategory = ["dev"];
      fetch.once(/\w*/, chuckCategory);

      
      getCategories().then((res) => expect(res).toEqual(chuckCategory));
    });
  });

  describe("#getJoke", () => {
    it("Must take one parameter", () => {
      expect.assertions(1);

      expect(getJoke.length).toBe(1);
    });

    it("Must use the category parameter in the url", () => {
      expect.assertions(1);
      const category = "dev";
      const chuckJoke = {
        value:
          "They say curiosity killed the cat. This is false. Chuck Norris killed the cat. Every single one of them.",
      };
      fetch.once(/.*=\w*/, chuckJoke);


      getJoke(category).then((res) => expect(res).toEqual(chuckJoke.value));
    });

    it("Must return a string", () => {
      expect.assertions(1);
      const category = "dev";
      const chuckJoke = {
        value:
          "They say curiosity killed the cat. This is false. Chuck Norris killed the cat. Every single one of them.",
      };
      fetch.once(/.*=\w*/, chuckJoke);


      getJoke(category).then((res) => expect(typeof res).toBe("string"));
    });
  });
});
