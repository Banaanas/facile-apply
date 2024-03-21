export const POST_SEARCH_CONFIGURATIONS: SearchConfigurations = {
  NextJsRemote: {
    keywords: ["next.js", "remote"],
  },
};

export interface SearchConfiguration {
  keywords: Array<string>;
}

export interface SearchConfigurations {
  [key: string]: SearchConfiguration;
}
