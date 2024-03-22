export const POST_SEARCH_CONFIGURATIONS: SearchConfigurations = {
  NextJsRemote: {
    keywords: ["next.js", "remote"],
  },
  ReactRemote: {
    keywords: ["react", "remote"],
  },
  FrontEndRemote: {
    keywords: ["front-end", "remote"],
  },
  WebDeveloperRemote: {
    keywords: ["web developer", "remote"],
  },
  UIDeveloper: {
    keywords: ["UI developer"],
  },
  ReactTeletravail: {
    keywords: ["react", "télétravail"],
  },
  IntegrateurWebRemote: {
    keywords: ["intégrateur web", "remote"],
  },
};

export interface SearchConfiguration {
  keywords: Array<string>;
}

export interface SearchConfigurations {
  [key: string]: SearchConfiguration;
}
