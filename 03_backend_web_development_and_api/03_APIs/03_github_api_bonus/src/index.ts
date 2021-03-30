import { getProjectInformation } from "./getProjectInformation";
import { getRepos } from "./getRepos";
import { getReposUrl } from "./getReposUrl";
import { ProjectInformation } from "./types";
import * as readline from "readline";
import { PresentationRepo } from "./types"

const reader = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function drawLine(): void {
  console.log("**************************************");
}

function restart(error?: Error): void {
  if (error) {
    console.log(error.message);
  }
  drawLine();
  githubExercise();
}

function printProjectInformation(name: string, infos: ProjectInformation): void {
  const cleanName = name.replace(/\w*\//, "");
  console.log(`Repository:          ${cleanName}`);
  console.log(`Description:         ${infos.description ? infos.description : "No description available"}`);
  console.log(`Subscribers count:   ${infos.subscribers_count}`);
  console.log(`Stars count:         ${infos.stargazers_count}`);
  console.log(`Language:            ${infos.language}`);
  console.log(`Git url:             ${infos.git_url}`);
}

function displayRepos(repos: PresentationRepo[]): void {
  repos.forEach((repo, i) => {
    if (repo && repo.name) {
      console.log(`${i + 1} - ${repo.name.replace(/\w*\//, "")}`);
    }
  });
  drawLine();

  reader.question("Select a repo\n> ", (repoIndex) => {
    drawLine();

    const index = parseInt(repoIndex) - 1;
    const selectedRepository = repos[index];
    if (selectedRepository) {
      getProjectInformation(selectedRepository.url)
        .then((repoInformation) => {
          printProjectInformation(selectedRepository.name, repoInformation);

          drawLine();
          reader.question("Do you want to continue? (Y/n)\n> ", (input) => {
            if (input === "n") {
              console.log("\nSee you later!\n");
              reader.close();
            } else {
              restart();
            }
          });
        })
        .catch((error) => restart(error));
    } else {
        displayRepos(repos);
    }
  });
}

function githubExercise(): void {
  reader.question("Enter a github username\n> ", (githubUsername) => {
    drawLine();
    getReposUrl(githubUsername)
      .then((url) => getRepos(url))
      .then((repos) => displayRepos(repos))
      .catch((error) => restart(error));
  });
}

githubExercise();
