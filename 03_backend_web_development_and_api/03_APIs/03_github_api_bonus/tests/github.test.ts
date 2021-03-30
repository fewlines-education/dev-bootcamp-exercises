jest.mock("node-fetch");
import { getReposUrl } from "../src/getReposUrl";
import { getRepos } from "../src/getRepos";
import { getProjectInformation } from "../src/getProjectInformation";
import { profile, repos, repo, notFound } from "./test-data";
const fetch = require("node-fetch");

const mockedGhProfileRequest = () => {
  return Promise.resolve({
    status: 200,
    json: () => Promise.resolve(profile),
    text: () => Promise.resolve(JSON.stringify(profile)),
  });
};

const mockedRepositoriesRequest = () => {
  return Promise.resolve({
    status: 200,
    json: () => Promise.resolve(repos),
    text: () => Promise.resolve(JSON.stringify(repos)),
  });
};

const mockedRepositoryRequest = () => {
  return Promise.resolve({
    status: 200,
    json: () => Promise.resolve(repo),
    text: () => Promise.resolve(JSON.stringify(repo)),
  });
};

const mockedNotFoundRequest = () => {
  return Promise.resolve({
    status: 404,
    json: () => Promise.resolve(notFound),
    text: () => Promise.resolve(JSON.stringify(notFound)),
  });
};

const mockedErrorRequest = () => {
  return Promise.reject(new Error("An error occured"));
};

describe("getReposUrl function", () => {
  afterAll(() => {
    fetch.default.mockReset();
  });

  it("Must use the Github username paramater to make the api call", async () => {
    expect.assertions(2);

    fetch.default.mockImplementation(mockedGhProfileRequest);

    await getReposUrl("Tata");
    await getReposUrl("Toto");

    expect(fetch.default.mock.calls[0][0]).toBe("https://api.github.com/users/Tata");
    expect(fetch.default.mock.calls[1][0]).toBe("https://api.github.com/users/Toto");
  });

  it("Must return (the Promise of) a repositories url", async () => {
    expect.assertions(1);

    fetch.default.mockImplementation(mockedGhProfileRequest);

    const url = await getReposUrl("Meyclem");
    expect(url).toBe("https://api.github.com/users/Meyclem/repos");
  });

  it("Must handle errors by throwing an 'Error'", async () => {
    expect.assertions(4);

    fetch.default.mockImplementation(mockedNotFoundRequest);

    try {
      await getReposUrl("Meyclem");
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBeDefined();
    }

    fetch.default.mockImplementation(mockedErrorRequest);

    try {
      await getReposUrl("Meyclem");
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBeDefined();
    }
  });
});

describe("getRepos function", () => {
  afterAll(() => {
    fetch.default.mockReset();
  });

  it("Must use the url paramater to make the api call", async () => {
    expect.assertions(1);

    fetch.default.mockImplementation(mockedRepositoriesRequest);

    const url = "https://any-url.com";

    getRepos(url);

    expect(fetch.default.mock.calls[0][0]).toBe(url);
  });

  it("Must return (the Promise of) an array", async () => {
    expect.assertions(1);

    fetch.default.mockImplementation(mockedRepositoriesRequest);

    const url = "https://api.github.com/users/Meyclem/repos";

    const list = await getRepos(url);
    expect(Array.isArray(list)).toBe(true);
  });

  it("Must return (the Promise of) an array of objects with keys 'name' and 'url'", async () => {
    expect.assertions(1);

    fetch.default.mockImplementation(mockedRepositoriesRequest);

    const url = "https://api.github.com/users/Meyclem/repos";

    const list = await getRepos(url);
    expect(Object.keys(list[0])).toEqual(["name", "url"]);
  });

  it("Must handle errors by throwing an Error", async () => {
    expect.assertions(4);

    fetch.default.mockImplementation(mockedNotFoundRequest);

    try {
      await getRepos("https://any-url.com");
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBeDefined();
    }

    fetch.default.mockImplementation(mockedErrorRequest);

    try {
      await getRepos("https://any-url.com");
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBeDefined();
    }
  });
});

describe("getProjectInformation function", () => {
  afterAll(() => {
    fetch.default.mockReset();
  });

  it("Must use the given url parameters to make the api call", async () => {
    expect.assertions(1);

    fetch.default.mockImplementation(mockedRepositoryRequest);

    const url = "https://api.github.com/repos/Meyclem/road-rush";

    await getProjectInformation(url);
    expect(fetch.default.mock.calls[0][0]).toBe(url);
  });

  it("Must return (the Promise of) an object with the project data", async () => {
    expect.assertions(1);

    fetch.default.mockImplementation(mockedRepositoryRequest);

    const url = "https://api.github.com/repos/Meyclem/road-rush";

    const information = await getProjectInformation(url);
    expect(typeof information).toBe("object");
  });

  it("Must return (in a Promise) only the required information", async () => {
    expect.assertions(1);

    fetch.default.mockImplementation(mockedRepositoryRequest);

    const url = "https://api.github.com/repos/Meyclem/road-rush";

    const information = await getProjectInformation(url);
    const requiredKeys = ["description", "language", "subscribers_count", "stargazers_count", "git_url"];
    expect(Object.keys(information).sort()).toEqual(requiredKeys.sort());
  });

  it("Must handle errors by throwing an Error", async () => {
    expect.assertions(4);

    fetch.default.mockImplementation(mockedNotFoundRequest);

    try {
      await getProjectInformation("https://any-url.com");
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBeDefined();
    }

    fetch.default.mockImplementation(mockedErrorRequest);

    try {
      await getProjectInformation("https://any-url.com");
    } catch (error) {
      expect(error).toBeDefined();
      expect(error.message).toBeDefined();
    }
  });
});
