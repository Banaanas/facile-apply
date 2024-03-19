import { SearchConfigurations } from "@/scripts/linkedin/fetch-jobs/data/linkedin-search-types";

export const SEARCH_CONFIGURATIONS: SearchConfigurations = {
  France: {
    geoId: "105015875",
    keywords: ["next.js", "react", "Intégrateur Web"],
  },
  Europe: {
    geoId: "91000000",
    keywords: ["next.js", "react", "Intégrateur Web"],
  },
  Suisse: {
    geoId: "106693272",
    keywords: ["next.js", "react"],
  },
  USA: {
    geoId: "103644278",
    keywords: ["next.js", "react"],
  },
  Canada: {
    geoId: "101174742",
    keywords: ["next.js", "react"],
  },
  World: {
    geoId: "92000000",
    keywords: ["React Developer", "UI developer", "UX developer"],
  },
};
