import fetch from "node-fetch";
import type { Repo } from "./src/github-client";

export const getOneRepoInfos = async (repoUrl: string): Promise<Repo> => {
    const response = await fetch(repoUrl)
    return await response.json()
}

export const getReposUrlByNickname = async (nickname: string): Promise<string | undefined> => {
    const response = await fetch(`https://api.github.com/users/${nickname}`)
    const data = await response.json()
    if (data.message && data.message === "Not Found") {
      return undefined;
    }
    return data.repos_url
}

export const listRepos = async (reposUrl: string): Promise<Repo []> => {
    const response = await fetch(reposUrl)
    return await response.json()
}


