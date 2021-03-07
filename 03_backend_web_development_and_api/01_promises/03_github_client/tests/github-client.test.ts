jest.mock("node-fetch", () => require("fetch-mock-jest").sandbox());
const fetch = require("node-fetch");
import { GithubClient } from "../src/github-client";

const profile = {
  repos_url: "someurl",
};

const userNotFound = {
  message: "Not Found",
  documentation_url: "https://developer.github.com/v3/users/#get-a-single-user",
};

const repo = {
  name: "fake repo",
  description: "this is a fake repo",
  language: "Typescript",
  subscribers_count: 0,
  stargazers_count: 1,
  url: "git://github.com/fake-user/fake-repo.git",
};

describe("Github Client", () => {
  afterEach(() => fetch.reset());

  describe("#getReposUrl", () => {
    it("Must use getReposUrlByNickname", () => {
      expect.assertions(1);
    

      fetch.once(/\w*/, {});
      const getReposUrlByNickname = fetch


      GithubClient.getReposUrl("fewlinesco");
      expect(getReposUrlByNickname.called()).toBe(true);
    });

    it("Must use the nickname parameter in the url", () => {
      expect.assertions(3);

      expect(GithubClient.getReposUrl.length).toBe(1);


      fetch.once(/\w*/, {});


      GithubClient.getReposUrl("fewlinesco");
      expect(fetch.called()).toBe(true);
      expect(fetch.calls()[0][0]).toContain("fewlinesco");
    });

    it("Must return a promise with the user's repositories url as a string", async () => {
      expect.assertions(3);


      const fetchResponse = profile;
      fetch.once(/\w*/, fetchResponse);

  
      const promise = GithubClient.getReposUrl("fewlinesco");
      const reposUrl = await promise.then((res) => res);

      expect(typeof promise.then).toBe("function");
      expect(typeof promise.catch).toBe("function");
      expect(reposUrl).toBe(fetchResponse.repos_url);
    });

    it("Must throw an error with a clear message when the user doesn't exist", async () => {
      expect.assertions(3);

      const fetchResponse = userNotFound;
      fetch.once(/\w*/, fetchResponse);


      const promise = GithubClient.getReposUrl("fakeUser");
      const errorMessage = await promise.catch((error) => error.message);

      expect(typeof promise.then).toBe("function");
      expect(typeof promise.catch).toBe("function");
      expect(errorMessage).toMatch(/.*user.*/i);
    });
  });

  describe("#getRepos", () => {
    it("Must use fetch", () => {
      expect.assertions(1);

      fetch.once(/\w*/, [repo]);


      GithubClient.getRepos("https://fake-url.io");
      expect(fetch.called()).toBe(true);
    });

    it("Must use the url parameter to make the fetch call", () => {
      expect.assertions(3);

      expect(GithubClient.getRepos.length).toBe(1);

      fetch.once(/\w*/, [repo]);


      GithubClient.getRepos("https://fake-url.io/");
      expect(fetch.called()).toBe(true);
      expect(fetch.calls()[0][0]).toBe("https://fake-url.io/");
    });

    it("Must return a promise with the repositories list", async () => {
      expect.assertions(3);

      const fetchResponse = [repo, repo];
      fetch.once(/\w*/, fetchResponse);
      const promise = GithubClient.getRepos("https://fake-url.io/");
      const repos = await promise.then((res) => res);


      expect(typeof promise.then).toBe("function");
      expect(typeof promise.catch).toBe("function");
      expect(repos).toEqual(fetchResponse);
    });
  });

  describe("#getProjectInformations", () => {
    it("Must use fetch", () => {
      expect.assertions(1);

      fetch.once(/\w*/, {});


      GithubClient.getProjectInformations("https://fake-url.io");
      expect(fetch.called()).toBe(true);
    });

    it("Must use the url parameter to make the fetch call", () => {
      expect.assertions(3);


      fetch.once(/\w*/, {});


      expect(GithubClient.getRepos.length).toBe(1);


      GithubClient.getProjectInformations("https://fake-url.io/");
      expect(fetch.called()).toBe(true);
      expect(fetch.calls()[0][0]).toBe("https://fake-url.io/");
    });

    it("Must return a promise with the repository only", async () => {
      expect.assertions(3);


      const fetchResponse = repo;
      fetch.once(/\w*/, fetchResponse);
      const promise = GithubClient.getProjectInformations(
        "https://fake-url.io/"
      );
      const repository = await promise.then((res) => res);

      expect(typeof promise.then).toBe("function");
      expect(typeof promise.catch).toBe("function");
      expect(repository).toEqual(fetchResponse);
    });
  });

  describe("#printRepos", () => {
    it("Must take an array repositories as argument", () => {
      expect.assertions(1);

      expect(GithubClient.printRepos.length).toBe(1);
    });

    it("Must return the array", () => {
      expect.assertions(1);

      const fakeLog = jest.spyOn(console, "log").mockImplementation();

      const repositories = GithubClient.printRepos([repo]);

      expect(repositories).toEqual([repo]);

      fakeLog.mockRestore();
    });

    it("Must use 'console.log' to print the list of repositories in the right format", () => {
      expect.assertions(1);

      const fakeLog = jest.spyOn(console, "log").mockImplementation((log) => {
        expect(log).toMatch(/.*1.*fake repo/);
      });

      GithubClient.printRepos([repo]);

      fakeLog.mockRestore();
    });
  });

  describe("#printRepoitory", () => {
    it("Must take a repository as an argument", () => {
      expect.assertions(1);

      expect(GithubClient.printRepos.length).toBe(1);
    });

    it("Must use 'console.log' to print the repository informations", () => {
      expect.assertions(6);

      let result = "\n";

      const fakeLog = jest.spyOn(console, "log").mockImplementation((log) => {
        result += log + "\n";
      });

      GithubClient.printRepository(repo);

      expect(result).toMatch(/.*fake repo.*/i);
      expect(result).toMatch(/.*this is a fake repo.*/i);
      expect(result).toMatch(/.*0.*/i);
      expect(result).toMatch(/.*1.*/i);
      expect(result).toMatch(/.*typescript.*/i);
      expect(result).toMatch(
        /.*git:\/\/github.com\/fake-user\/fake-repo.git.*/i
      );

      fakeLog.mockRestore();
    });
  });
});
