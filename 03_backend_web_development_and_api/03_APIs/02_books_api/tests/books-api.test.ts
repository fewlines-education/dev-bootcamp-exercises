// @ts-nocheck
jest.mock("request");
const mockedFetch = () =>
  Promise.resolve({
    json: jest.fn(),
  });
jest.mock("node-fetch", () => ({
  default: jest.fn().mockImplementation(mockedFetch),
}));
const request = require("request");
const fetch = require("node-fetch");
import { startServer } from "../src/server";
import { BookRepository } from "../src/repositories/BookRepository";
import { AuthorRepository } from "../src/repositories/AuthorRepository";
import { UserRepository } from "../src/repositories/UserRepository";
const data = require("../src/data/library.json");

const mockedRequest = (request, callback) => {
  callback(null, {}, JSON.stringify({}));
};

describe("Book API", () => {
  let server;
  let bookRepository;
  let authorRepository;
  let userRepository;

  beforeAll(async () => {
    process.env.PORT = "7654";
    process.env.BASE_URL = `http://localhost:${process.env.PORT}`;
    server = await startServer(data);
  });

  afterAll(async () => {
    await server.close();
  });

  beforeEach(() => {
    const trueRequest = jest.requireActual("request");
    request.mockImplementation(trueRequest);
  });

  describe("=> Book Repository", () => {
    beforeAll(() => {
      bookRepository = new BookRepository();
    });

    describe("#getAll", () => {
      it("Must use 'node-fetch' package with the right url and method", async () => {
        fetch.default.mockReset();
        fetch.default.mockImplementation(mockedFetch);

        await bookRepository.getAll();

        expect(fetch.default.mock.calls[0][0]).toBe(`${process.env.BASE_URL}/books`);
        if (fetch.default.mock.calls[0][1]) {
          expect(fetch.default.mock.calls[0][1].method).toBe("GET");
        }
        expect(fetch.default).toHaveBeenCalled();
      });

      it("Returns a `books` array", async () => {
        expect.assertions(2);

        fetch.default.mockReset();
        fetch.default.mockImplementationOnce((...args) => jest.requireActual("node-fetch")(...args));

        const books = await bookRepository.getAll();
        expect(Array.isArray(books)).toBe(true);
        expect(Object.keys(books[0])).toEqual(["id", "name", "year", "authorId"]);
      });
    });

    describe("#getOne", () => {
      it("Must use 'node-fetch' package with the right url and method", async () => {
        fetch.default.mockReset();
        fetch.default.mockImplementation(mockedFetch);
        const id = 1;

        await bookRepository.getOne(id);

        expect(fetch.default.mock.calls[0][0]).toBe(`${process.env.BASE_URL}/books/${id}`);
        if (fetch.default.mock.calls[0][1]) {
          expect(fetch.default.mock.calls[0][1].method).toBe("GET");
        }
      });

      it("Returns a `book` object", async () => {
        expect.assertions(2);

        fetch.default.mockReset();
        fetch.default.mockImplementationOnce((...args) => jest.requireActual("node-fetch")(...args));

        const book = await bookRepository.getOne(1);
        expect(typeof book).toBe("object");
        expect(Object.keys(book)).toEqual(["id", "name", "year", "authorId"]);
      });
    });

    describe("#getBookComments", () => {
      it("Must use 'node-fetch' package with the right url and method", async () => {
        fetch.default.mockReset();
        fetch.default.mockImplementation(mockedFetch);
        const id = 2;

        await bookRepository.getBookComments(id);

        expect(fetch.default.mock.calls[0][0]).toBe(`${process.env.BASE_URL}/books/${id}/comments`);
        if (fetch.default.mock.calls[0][1]) {
          expect(fetch.default.mock.calls[0][1].method).toBe("GET");
        }
        expect(fetch.default).toHaveBeenCalled();
      });

      it("Returns a `comments` array", async () => {
        expect.assertions(2);

        fetch.default.mockReset();
        fetch.default.mockImplementationOnce((...args) => jest.requireActual("node-fetch")(...args));

        const comments = await bookRepository.getBookComments(2);
        expect(Array.isArray(comments)).toBe(true);
        const keys = ["id", "bookId", "userId", "title", "content"];
        expect(Object.keys(comments[0])).toEqual(keys);
      });
    });

    describe("#searchByTitle", () => {
      it("Must use 'node-fetch' package with the right url and method", async () => {
        fetch.default.mockReset();
        fetch.default.mockImplementation(mockedFetch);
        const term = "assassin";

        await bookRepository.searchByTitle(term);

        expect(fetch.default.mock.calls[0][0]).toBe(`${process.env.BASE_URL}/books?q=${term}`);
        if (fetch.default.mock.calls[0][1]) {
          expect(fetch.default.mock.calls[0][1].method).toBe("GET");
        }
        expect(fetch.default).toHaveBeenCalled();
      });

      it("Returns a `books` array", async () => {
        expect.assertions(2);

        fetch.default.mockReset();
        fetch.default.mockImplementationOnce((...args) => jest.requireActual("node-fetch")(...args));

        const books = await bookRepository.searchByTitle(2);
        expect(Array.isArray(books)).toBe(true);
        expect(Object.keys(books[0])).toEqual(["id", "name", "year", "authorId"]);
      });
    });

    test("Must have all required functions", () => {
      expect.assertions(4);
      expect(typeof bookRepository.getAll).toBe("function");
      expect(typeof bookRepository.getOne).toBe("function");
      expect(typeof bookRepository.getBookComments).toBe("function");
      expect(typeof bookRepository.searchByTitle).toBe("function");
    });
  });

  describe("=> Author Repository", () => {
    beforeAll(() => {
      authorRepository = new AuthorRepository();
    });

    describe("#getAll", () => {
      it("Must use 'node-fetch' package with the right url and method", async () => {
        fetch.default.mockReset();
        fetch.default.mockImplementation(mockedFetch);

        await authorRepository.getAll();

        expect(fetch.default.mock.calls[0][0]).toBe(`${process.env.BASE_URL}/authors`);
        if (fetch.default.mock.calls[0][1]) {
          expect(fetch.default.mock.calls[0][1].method).toBe("GET");
        }
        expect(fetch.default).toHaveBeenCalled();
      });

      it("returns an `authors` array", async () => {
        expect.assertions(2);

        fetch.default.mockReset();
        fetch.default.mockImplementationOnce((...args) => jest.requireActual("node-fetch")(...args));

        const authors = await authorRepository.getAll();

        expect(Array.isArray(authors)).toBe(true);
        expect(Object.keys(authors[0]).sort()).toEqual(["id", "name"].sort());
      });
    });

    describe("#getOne", () => {
      it("Must use 'node-fetch' package with the right url and method", async () => {
        fetch.default.mockReset();
        fetch.default.mockImplementation(mockedFetch);
        const id = 1;

        await authorRepository.getOne(id);

        expect(fetch.default.mock.calls[0][0]).toBe(`${process.env.BASE_URL}/authors/${id}`);
        if (fetch.default.mock.calls[0][1]) {
          expect(fetch.default.mock.calls[0][1].method).toBe("GET");
        }
        expect(fetch.default).toHaveBeenCalled();
      });

      it("Returns an `author` object", async () => {
        expect.assertions(2);

        fetch.default.mockReset();
        fetch.default.mockImplementationOnce((...args) => jest.requireActual("node-fetch")(...args));

        const book = await authorRepository.getOne(1);
        expect(typeof book).toBe("object");
        expect(Object.keys(book).sort()).toEqual(["id", "name"].sort());
      });
    });

    describe("#getAuthorBooks", () => {
      it("Must use 'node-fetch' package with the right url and method", async () => {
        fetch.default.mockReset();
        fetch.default.mockImplementation(mockedFetch);
        const id = 2;

        await authorRepository.getAuthorBooks(id);

        expect(fetch.default.mock.calls[0][0]).toBe(`${process.env.BASE_URL}/authors/${id}/books`);
        if (fetch.default.mock.calls[0][1]) {
          expect(fetch.default.mock.calls[0][1].method).toBe("GET");
        }
        expect(fetch.default).toHaveBeenCalled();
      });

      it("Returns a `books` array", async () => {
        expect.assertions(2);

        fetch.default.mockReset();
        fetch.default.mockImplementationOnce((...args) => jest.requireActual("node-fetch")(...args));

        const books = await authorRepository.getAuthorBooks(2);
        expect(Array.isArray(books)).toBe(true);
        const keys = ["id", "name", "year", "authorId"].sort();
        expect(Object.keys(books[0]).sort()).toEqual(keys);
      });
    });

    describe("#searchByName", () => {
      it("Must use 'node-fetch' package with the right url and method", async () => {
        fetch.default.mockReset();
        fetch.default.mockImplementation(mockedFetch);
        const term = "king";

        await authorRepository.searchByName(term);

        expect(fetch.default.mock.calls[0][0]).toBe(`${process.env.BASE_URL}/authors?q=${term}`);
        if (fetch.default.mock.calls[0][1]) {
          expect(fetch.default.mock.calls[0][1].method).toBe("GET");
        }
        expect(fetch.default).toHaveBeenCalled();
      });

      it("Returns an `authors` array", async () => {
        expect.assertions(2);

        fetch.default.mockReset();
        fetch.default.mockImplementationOnce((...args) => jest.requireActual("node-fetch")(...args));

        const authors = await authorRepository.searchByName("king");
        expect(Array.isArray(authors)).toBe(true);
        expect(Object.keys(authors[0]).sort()).toEqual(["id", "name"].sort());
      });
    });

    test("Must have all required functions", () => {
      expect.assertions(4);
      expect(typeof authorRepository.getAll).toBe("function");
      expect(typeof authorRepository.getOne).toBe("function");
      expect(typeof authorRepository.getAuthorBooks).toBe("function");
      expect(typeof authorRepository.searchByName).toBe("function");
    });
  });

  describe("=> User Repository", () => {
    beforeAll(() => {
      userRepository = new UserRepository();
    });

    describe("#getAll", () => {
      it("Must use 'node-fetch' package with the right url and method", async () => {
        fetch.default.mockReset();
        fetch.default.mockImplementation(mockedFetch);

        await userRepository.getAll();

        expect(fetch.default.mock.calls[0][0]).toBe(`${process.env.BASE_URL}/users`);
        if (fetch.default.mock.calls[0][1]) {
          expect(fetch.default.mock.calls[0][1].method).toBe("GET");
        }
        expect(fetch.default).toHaveBeenCalled();
      });

      it("Returns a `users` array to the callback", async () => {
        expect.assertions(2);

        fetch.default.mockReset();
        fetch.default.mockImplementationOnce((...args) => jest.requireActual("node-fetch")(...args));

        const users = await userRepository.getAll();
        expect(Array.isArray(users)).toBe(true);
        expect(Object.keys(users[0]).sort()).toEqual(["id", "name"].sort());
      });
    });

    describe("#getOne", () => {
      it("Must use 'node-fetch' package with the right url and method", async () => {
        fetch.default.mockReset();
        fetch.default.mockImplementation(mockedFetch);
        const id = 1;

        await userRepository.getOne(id);

        expect(fetch.default.mock.calls[0][0]).toBe(`${process.env.BASE_URL}/users/${id}`);
        if (fetch.default.mock.calls[0][1]) {
          expect(fetch.default.mock.calls[0][1].method).toBe("GET");
        }
        expect(fetch.default).toHaveBeenCalled();
      });

      it("Returns a `user` object", async () => {
        expect.assertions(2);

        fetch.default.mockReset();
        fetch.default.mockImplementationOnce((...args) => jest.requireActual("node-fetch")(...args));

        const user = await userRepository.getOne(1);
        expect(typeof user).toBe("object");
        expect(Object.keys(user).sort()).toEqual(["id", "name"].sort());
      });
    });

    describe("#getUserComments", () => {
      it("Must use 'node-fetch' package with the right url and method", async () => {
        fetch.default.mockReset();
        fetch.default.mockImplementation(mockedFetch);
        const id = 2;

        await userRepository.getUserComments(id);

        expect(fetch.default.mock.calls[0][0]).toBe(`${process.env.BASE_URL}/users/${id}/comments`);
        if (fetch.default.mock.calls[0][1]) {
          expect(fetch.default.mock.calls[0][1].method).toBe("GET");
        }
        expect(fetch.default).toHaveBeenCalled();
      });

      it("Returns a `comments` array", async () => {
        expect.assertions(2);

        fetch.default.mockReset();
        fetch.default.mockImplementationOnce((...args) => jest.requireActual("node-fetch")(...args));

        const comments = await userRepository.getUserComments(2);
        expect(Array.isArray(comments)).toBe(true);
        const keys = ["id", "bookId", "userId", "title", "content"].sort();
        expect(Object.keys(comments[0]).sort()).toEqual(keys.sort());
      });
    });

    describe("#create", () => {
      it("Must use 'node-fetch' package with the right params", async () => {
        expect.assertions(5);
        fetch.default.mockReset();
        fetch.default.mockImplementation(mockedFetch);

        const params = { name: "Elton John" };
        await userRepository.create(params);

        expect(fetch.default).toHaveBeenCalled();
        expect(fetch.default.mock.calls[0][0]).toBe(`${process.env.BASE_URL}/users`);
        expect(fetch.default.mock.calls[0][1].headers).toEqual({ "Content-Type": "application/json" });
        expect(fetch.default.mock.calls[0][1].method).toBe("POST");
        expect(fetch.default.mock.calls[0][1].body).toBe(`{"name":"${params.name}"}`);
      });

      it("Returns the created `user`", async () => {
        expect.assertions(2);

        fetch.default.mockReset();
        fetch.default.mockImplementationOnce((...args) => jest.requireActual("node-fetch")(...args));

        const params = { name: "Elton John" };

        const user = await userRepository.create(params);
        expect(typeof user).toBe("object");
        const keys = ["id", "name"].sort();
        expect(Object.keys(user).sort()).toEqual(keys.sort());
      });
    });

    describe("#update", () => {
      it("Must use 'node-fetch' package with the right params", async () => {
        expect.assertions(5);

        fetch.default.mockReset();
        fetch.default.mockImplementation(mockedFetch);

        const id = 1;
        const params = { name: "Booba" };
        await userRepository.update(id, params);

        expect(fetch.default).toHaveBeenCalled();
        expect(fetch.default.mock.calls[0][0]).toBe(`${process.env.BASE_URL}/users/${1}`);
        expect(fetch.default.mock.calls[0][1].headers).toEqual({ "Content-Type": "application/json" });
        expect(fetch.default.mock.calls[0][1].method).toBe("PATCH");
        expect(fetch.default.mock.calls[0][1].body).toBe(`{"name":"${params.name}"}`);
      });

      it("Returns the updated `user`", async () => {
        expect.assertions(2);

        fetch.default.mockReset();
        fetch.default.mockImplementationOnce((...args) => jest.requireActual("node-fetch")(...args));

        const id = 1;
        const params = { name: "Booba" };
        const user = await userRepository.update(id, params);
        expect(typeof user).toBe("object");
        const keys = ["id", "name"].sort();
        expect(Object.keys(user).sort()).toEqual(keys.sort());
      });
    });

    describe("#delete", () => {
      it("Must use 'node-fetch' package with the right params", async () => {
        expect.assertions(3);

        fetch.default.mockReset();
        fetch.default.mockImplementation(mockedFetch);

        const id = 1;
        await userRepository.delete(id)

        expect(fetch.default).toHaveBeenCalled();
        expect(fetch.default.mock.calls[0][0]).toBe(`${process.env.BASE_URL}/users/${id}`);
        expect(fetch.default.mock.calls[0][1].method).toBe("DELETE");
      });

      it("Returns the deleted `user`", async () => {
        expect.assertions(2);

        fetch.default.mockReset();
        fetch.default.mockImplementationOnce((...args) => jest.requireActual("node-fetch")(...args));

        const id = 1;
        const user = await userRepository.delete(id)
          expect(typeof user).toBe("object");
          expect(user).toEqual({});
      });
    });

    test("Must have all required functions", () => {
      expect.assertions(6);
      expect(typeof userRepository.getAll).toBe("function");
      expect(typeof userRepository.getOne).toBe("function");
      expect(typeof userRepository.getUserComments).toBe("function");
      expect(typeof userRepository.create).toBe("function");
      expect(typeof userRepository.update).toBe("function");
      expect(typeof userRepository.delete).toBe("function");
    });
  });
});
