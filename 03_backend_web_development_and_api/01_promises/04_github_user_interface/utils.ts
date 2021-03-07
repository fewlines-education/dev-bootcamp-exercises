import fetch, { Response } from "node-fetch";
import type { Repo } from "./src/github-client";

export const getOneRepoInfos = (repoUrl: string): Promise<Repo> => {
    return fetch(repoUrl)
    .then((response: Response) => response.json())
}

export const getReposUrlByNickname = (nickname: string): Promise<string | undefined> => {
    return fetch(`https://api.github.com/users/${nickname}`)
    .then((response: Response) => response.json())
    .then((data) => {
      if (data.message && data.message === "Not Found") {
        return undefined;
      }
      return data.repos_url
    });
}

export const listRepos = (reposUrl: string): Promise<Repo []> => {
    return fetch(reposUrl)
    .then((response: Response) => response.json())
}
