import console from "node:console";

import { fetchResultsWithProvider } from "@/scripts/linkedin/fetch-jobs/requests/provider-fetch-functions";
import { constructLinkedInGraphQLUrl } from "@/scripts/linkedin/fetch-posts/parsing/country-api-call-builder";
import { extractCountryFromCompanyProfileResponse } from "@/scripts/linkedin/fetch-posts/parsing/extract-country-company";
import { extractCountryFromIndividualProfileResponse } from "@/scripts/linkedin/fetch-posts/parsing/extract-country-individual";
import { PostItem } from "@/scripts/linkedin/fetch-posts/parsing/linkedin-api-response-posts-types";

export const fetchAuthorCountryFromPostItem = async (
  postItem: PostItem,
): Promise<string | null> => {
  const identifier = getIdentifier(postItem);
  if (!identifier) {
    console.error("Failed to extract identifier from the post item.");
    return null;
  }

  // Determine whether to use vanityName or universalName based on identifier type
  const graphqlQuery = constructLinkedInGraphQLUrl(identifier);

  try {
    const rawResponse = await fetchResultsWithProvider(graphqlQuery as string);

    let country;

    // Decide which function to use based on the identifier type
    if (identifier.type === "vanityName") {
      country = extractCountryFromIndividualProfileResponse(rawResponse);
    } else if (identifier.type === "universalName") {
      country = extractCountryFromCompanyProfileResponse(rawResponse);
    }

    // Handle the case where country couldn't be extracted
    if (!country) {
      return null;
    }

    return country;
  } catch (error) {
    console.error("Error fetching author's country:", error);
    return null;
  }
};

const getIdentifier = (postItem: PostItem): Identifier | undefined => {
  // Attempt to extract for individual profiles
  const entityUrn =
    postItem.item.entityResult?.image?.attributes[0]?.detailData
      ?.nonEntityProfilePicture?.profile.entityUrn;
  if (entityUrn) {
    return {
      type: "vanityName",
      value: extractIdentifierFromEntityUrn(entityUrn),
    };
  }

  // For company posts, extract from the actorNavigationUrl directly
  const actorNavigationUrl = postItem.item.entityResult?.actorNavigationUrl;
  if (actorNavigationUrl) {
    return {
      type: "universalName",
      value: extractIdentifierFromUrl(actorNavigationUrl),
    };
  }

  console.warn("Unable to extract identifier.");
  return undefined;
};

const extractIdentifierFromEntityUrn = (entityUrn: string): string => {
  const parts = entityUrn.split(":");
  return parts[parts.length - 1]; // Assumes the identifier is the last part
};

const extractIdentifierFromUrl = (url: string): string => {
  const urlObj = new URL(url);
  const pathSegments = urlObj.pathname.split("/").filter((segment) => segment);
  return pathSegments[pathSegments.length - 1]; // Assumes the identifier is in the last segment of the path
};

export type IdentifierType = "vanityName" | "universalName";

export interface Identifier {
  type: IdentifierType;
  value: string;
}
