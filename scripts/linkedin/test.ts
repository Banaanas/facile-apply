import fs from "node:fs";

import colors from "colors";

import { DelayOption } from "@/scripts/linkedin/fetch-jobs/data/search-params";
import { getPostResults } from "@/scripts/linkedin/fetch-posts/parsing/get-post-results";
import { buildLinkedInQueryUrl } from "@/scripts/linkedin/fetch-posts/requests/linkedin-posts-request-builder";

const GINO =
  "https://www.linkedin.com/voyager/api/graphql?includeWebMetadata=true&variables=(profileUrn:urn%3Ali%3Afsd_profile%3AACoAAAad_tMBb2LrAzMUjtGmCothHuXQ1s5Axow)&queryId=voyagerIdentityDashProfileCards.c5f4852e381062c5483b1681a2f9f4b5";

const GINO2 =
  "https://www.linkedin.com//voyager/api/graphql?includeWebMetadata\u003Dtrue\u0026variables\u003D(vanityName:ACoAACyV7aAB5aLprfeFMmECxpeIWX-LJIQZ4v0)\u0026queryId\u003DvoyagerIdentityDashProfiles.47378d97f886149fd501859465d719df";

// Need the vanityName

const main = async () => {
  const searchUrl = buildLinkedInQueryUrl("next.js");

  try {
    const postResults = await getPostResults(searchUrl, DelayOption.ENABLED);

    console.log(postResults.length);
    // register as file postResults with fs
    fs.writeFileSync("postResults.json", JSON.stringify(postResults));
  } catch (error) {
    console.error(colors.red("Error fetching LinkedIn data: "), error);
    throw error; // Rethrow if you want to propagate the error further
  }
};

main().catch(console.error);
