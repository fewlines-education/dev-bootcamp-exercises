// @ts-nocheck

jest.mock("node-fetch");
const { getChuckNorrisJoke } = require("../src/getChuckNorrisJoke");
const { getCategories } = require("../src/getCategories");
const fetch = require("node-fetch");

const mockedJoke = {
  value: "When Chuck Norris throws exceptions, it's across the room.",
};
const mockedJokeRequest = (url) => {
  return Promise.resolve({
    json: () => Promise.resolve(mockedJoke),
  });
};

const mockedCategoriesRequest = (url) => {
  return Promise.resolve({
    json: () => Promise.resolve(["animal", "dev"]),
  });
};

describe("Chuck Norris API", () => {
  describe("#getCategories", () => {
    afterAll(() => {
      fetch.default.mockReset();
    });

    it("Must use 'node-fetch' package to get a list of categories", async () => {
      expect.assertions(2);

      const spyLog = jest.spyOn(console, "log").mockImplementation();
      fetch.default.mockImplementation(mockedCategoriesRequest);

      await getCategories();

      expect(fetch.default).toHaveBeenCalled();
      expect(fetch.default.mock.calls[0][0]).toBe("https://api.chucknorris.io/jokes/categories");
      spyLog.mockRestore();
    });

    it("Must print the error with 'console.error' when the API respond with error", async () => {
      const spyLogError = jest.spyOn(console, "error").mockImplementation();
      expect.assertions(1);

      fetch.default.mockImplementationOnce(() => {
        return Promise.reject(new Error("This is a fake error"));
      });

      await getCategories();

      expect(spyLogError).toHaveBeenCalled();
      spyLogError.mockRestore();
    });

    it("Must not print anything with 'console.log' when an error is throwned", async () => {
      expect.assertions(3);

      const spyLog = jest.spyOn(console, "log").mockImplementation();
      const spyLogError = jest.spyOn(console, "error").mockImplementation();
      fetch.default.mockImplementationOnce(() => {
        return Promise.reject(new Error("This is a fake error"));
      });

      await getCategories();

      expect(spyLog).not.toHaveBeenCalled();
      expect(spyLogError).toHaveBeenCalled();
      expect(fetch.default).toHaveBeenCalled();
      spyLog.mockRestore();
      spyLogError.mockRestore();
    });

    it("Must print a list of categories with 'console.log'", async () => {
      expect.assertions(2);

      fetch.default.mockImplementationOnce(mockedCategoriesRequest);
      const spyLog = jest.spyOn(console, "log").mockImplementation((string) => {
        expect(/.*animal.*dev/.exec(string)).toBeTruthy();
      });

      await getCategories();

      expect(spyLog).toHaveBeenCalled();
      spyLog.mockRestore();
    });
  });

  describe("#getChuckNorrisJoke", () => {
    afterAll(() => {
      fetch.default.mockReset();
    });

    it("Must print an error with 'console.error' when the API respond with error", async () => {
      expect.assertions(1);

      const spyLogError = jest.spyOn(console, "error").mockImplementation();
      fetch.default.mockImplementationOnce(() => {
        return Promise.reject(new Error("This is a fake error"));
      });

      await getChuckNorrisJoke("dev");

      expect(spyLogError).toHaveBeenCalled();
      spyLogError.mockRestore();
    });

    it("Must not print anything with 'console.log' when an error is throwned", async () => {
      expect.assertions(3);

      fetch.default.mockImplementationOnce(() => {
        return Promise.reject(new Error("This is a fake error"));
      });
      const spyLog = jest.spyOn(console, "log").mockImplementation();
      const spyLogError = jest.spyOn(console, "error").mockImplementation();

      await getChuckNorrisJoke("dev");

      expect(spyLog).not.toHaveBeenCalled();
      expect(spyLogError).toHaveBeenCalled();
      expect(fetch.default).toHaveBeenCalled();
      spyLog.mockRestore();
      spyLogError.mockRestore();
    });

    it("Must use 'node-fetch' package to get a joke", async () => {
      expect.assertions(2);

      fetch.default.mockImplementationOnce(mockedJokeRequest);
      const spyLog = jest.spyOn(console, "log").mockImplementation();

      await getChuckNorrisJoke("dev");

      expect(fetch.default).toHaveBeenCalled();
      expect(fetch.default.mock.calls[0][0]).toBe("https://api.chucknorris.io/jokes/random?category=dev");
      spyLog.mockRestore();
    });

    it("Must use the category parameter in the API url", async () => {
      expect.assertions(4);

      fetch.default.mockImplementationOnce(mockedJokeRequest);
      const spyLog = jest.spyOn(console, "log").mockImplementation();

      await getChuckNorrisJoke("dev");

      expect(fetch.default).toHaveBeenCalled();
      expect(fetch.default.mock.calls[0][0]).toBe("https://api.chucknorris.io/jokes/random?category=dev");

      fetch.default.mockClear();

      fetch.default.mockImplementationOnce(mockedJokeRequest);

      await getChuckNorrisJoke("cat");

      expect(fetch.default).toHaveBeenCalled();
      expect(fetch.default.mock.calls[0][0]).toBe("https://api.chucknorris.io/jokes/random?category=cat");
      spyLog.mockRestore();
    });

    it("Must print a joke with 'console.log'", async () => {
      expect.assertions(2);

      fetch.default.mockImplementationOnce(mockedJokeRequest);
      const spy = jest.spyOn(console, "log").mockImplementation((log) => {
        expect(log).toEqual(mockedJoke);
      });

      await getChuckNorrisJoke("dev");

      expect(spy).toHaveBeenCalled();
      spy.mockRestore();
    });
  });
});
