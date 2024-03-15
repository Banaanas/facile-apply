import * as console from "node:console";

import colors from "colors";
import { firefox } from "playwright";

import { checkDatabaseConnection } from "@/scripts/database/check-running-database";
import { fetchPageWithProvider } from "@/scripts/indeed/fetch-jobs/requests/provider-fetch-functions";


const LINKEDIN_SEARCH =
  "https://www.linkedin.com/voyager/api/voyagerJobsDashJobCards?decorationId=com.linkedin.voyager.dash.deco.jobs.search.JobSearchCardsCollection-195&count=25&q=jobSearch&query=(origin:JOB_SEARCH_PAGE_JOB_FILTER,keywords:React.js,locationUnion:(geoId:105282085),selectedFilters:(distance:List(0)),spellCorrectionEnabled:true)&start=25";


const main = async () => {
  const browser = await firefox.launch();

  // If Database is not already running, STOP the process - Avoiding costs of fetching pages that won't be registered in the database after
  await checkDatabaseConnection();


      console.log(
        colors.cyan(
          `Searching ${LINKEDIN_SEARCH}...`,
        ),
      )



      const initialSearchHTML = await fetchPageWithProvider(indeedSearchUrl);


  }

  console.log(colors.rainbow("ALL SEARCHES HAVE BEEN COMPLETED"));
};

main().catch(console.error);
