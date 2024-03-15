import axios from "axios";
import colors from "colors";
import * as fs from "fs";

import { linkedInConfig } from "@/scripts/config";

const jobsSearchLink =
  "https://www.linkedin.com/voyager/api/voyagerJobsDashJobCards?decorationId=com.linkedin.voyager.dash.deco.jobs.search.JobSearchCardsCollection-195&count=25&q=jobSearch&query=(origin:JOB_SEARCH_PAGE_JOB_FILTER,keywords:React.js,locationUnion:(geoId:105282085),selectedFilters:(distance:List(0)),spellCorrectionEnabled:true)&start=25";

async function getDataLinkedInVoyager() {
  if (!linkedInConfig.jsessionId || !linkedInConfig.liat) {
    throw new Error(
      "One or more required environment variables are not defined.",
    );
  }

  const headers = {
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.181 Safari/537.36",
    Cookie: `JSESSIONID=${linkedInConfig.jsessionId}; li_at=${linkedInConfig.liat};`,
    "csrf-token": `${linkedInConfig.jsessionId}`,
  };

  try {
    const { data } = await axios.get(jobsSearchLink, { headers });
    fs.writeFileSync("response.json", JSON.stringify(data), "utf8");
    console.log(data);
  } catch (error) {
    if (error.response && error.response.status === 302) {
      console.warn(
        "Detected a redirect. This may indicate that the JSESSIONID or li_at token is expired or invalid.",
      );
    } else if (error.code === "ERR_FR_TOO_MANY_REDIRECTS") {
      console.log(
        colors.red(
          "Maximum number of redirects exceeded. This is likely due to expired or invalid JSESSIONID or li_at tokens. Please, verify.",
        ),
      );
    } else {
      console.error("An unexpected error occurred:", error.message);
    }
  }
}

getDataLinkedInVoyager().catch(console.error);
