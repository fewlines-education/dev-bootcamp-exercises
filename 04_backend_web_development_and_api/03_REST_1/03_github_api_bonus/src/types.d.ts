export interface ProjectInformation {
  description: string;
  language: string;
  subscribers_count: string;
  stargazers_count: string;
  git_url: string;
}

export interface GithubProject extends ProjectInformation {
  // Line below represents keys that we don't care and don't want to type.
  [key: string]: string;
}

export type PresentationRepo = {
  name: string;
  url: string;
}
