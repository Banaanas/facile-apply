import { fetchResultsWithProvider } from "@/scripts/linkedin/fetch-jobs/requests/provider-fetch-functions";
import { PostItem } from "@/scripts/linkedin/fetch-posts/parsing/linkedin-api-response-posts-types";
import fs from "node:fs";
import * as process from "process";

export const fetchAuthorCountryFromPostItem = async (
  postItem: PostItem,
): Promise<string | undefined> => {
  const entityUrn = getEntityUrnFromPostItem(postItem);

  if (!entityUrn) {
    console.error("Failed to extract entityUrn from the post item.");
    return undefined;
  }

  const vanityName = extractVanityNameFromEntityUrn(entityUrn);
  // Construct the URL without manual encoding, assuming Axios or similar in fetchResultsWithProvider will handle it
  const graphqlUrl = `https://www.linkedin.com/voyager/api/graphql?includeWebMetadata=true&variables=(vanityName:${vanityName})&queryId=voyagerIdentityDashProfiles.47378d97f886149fd501859465d719df`;

  try {
    // Utilize fetchResultsWithProvider to perform the request
    const rawResponse = await fetchResultsWithProvider(graphqlUrl);

    const country = extractCountryFromResponse(rawResponse);
    return country;
  } catch (error) {
    console.error("Error fetching author's country:", error);
    return undefined;
  }
};

const getEntityUrnFromPostItem = (postItem: PostItem): string | undefined => {
  console.log(
    postItem.item.entityResult?.image?.attributes[0]?.detailData
      ?.nonEntityProfilePicture?.profile.entityUrn,
  );

  if (
    postItem.item.entityResult?.image?.attributes[0]?.detailData
      ?.nonEntityProfilePicture?.profile.entityUrn === undefined
  ) {
    // register fs postitem as json file with fs
    fs.writeFileSync("postItem.json", JSON.stringify(postItem));
    process.exit(0);
  }

  return postItem.item.entityResult?.image?.attributes[0]?.detailData
    ?.nonEntityProfilePicture?.profile.entityUrn;
};

const extractVanityNameFromEntityUrn = (entityUrn: string): string => {
  const parts = entityUrn.split(":");

  // Assumes the vanity name is the last part after the last colon
  return parts[parts.length - 1];
};

const extractCountryFromResponse = (
  responseData: LinkedInApiResponse,
): string | undefined => {
  const { elements } = responseData.data.identityDashProfilesByMemberIdentity;
  if (!elements || elements.length === 0) {
    console.error("No elements found in the response data.");
    return undefined;
  }

  // Assuming interest in the first element's country
  const country = elements[0]?.geoLocation?.geo?.country?.defaultLocalizedName;
  return country;
};

export interface LinkedInApiResponse {
  data: {
    identityDashProfilesByMemberIdentity: IdentityDashProfilesByMemberIdentity;
  };
}

interface IdentityDashProfilesByMemberIdentity {
  elements: Element[];
}

interface Element {
  geoLocation?: GeoLocation;
}

interface GeoLocation {
  geo: Geo;
}

interface Geo {
  country: Country;
}

interface Country {
  defaultLocalizedName: string;
}
