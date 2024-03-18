import { SearchConfigs } from "@/scripts/linkedIn/fetch-jobs/fetch-jobs.types";
import {
  ExperienceLevel,
  SortBy,
  TimePosted,
  WorkplaceType,
} from "@/scripts/linkedIn/fetch-jobs/utils/constants";

export const searchConfigs: SearchConfigs = {
  reactDeveloper: {
    keywords: "React",
    geoId: "105015875",
    selectedFilters: {
      sortBy: SortBy.MostRecent,
      experience: [
        ExperienceLevel.Entry,
        ExperienceLevel.Mid,
        ExperienceLevel.Senior,
      ],
      timePostedRange: TimePosted.LastWeek,
      workplaceType: [WorkplaceType.Remote],
      applyWithLinkedin: false,
    },
  },
};
