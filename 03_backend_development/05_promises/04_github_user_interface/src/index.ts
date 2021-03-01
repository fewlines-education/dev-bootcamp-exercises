import { ask, closeRl } from "../interface";
import { GithubClient, Repo } from "./github-client";

ask("Github nickname\n> ")
  .then((nickname) => GithubClient.getReposUrl(nickname))
  // Continue to chain here
