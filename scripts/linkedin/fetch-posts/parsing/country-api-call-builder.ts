import { Identifier } from "@/scripts/linkedin/fetch-posts/parsing/get-author-post-country";

export const constructLinkedInGraphQLUrl = (
  identifier: Identifier,
): string | null => {
  let queryId;
  let queryType;

  if (identifier.type === "vanityName") {
    queryType = `vanityName:${identifier.value}`;
    queryId = "voyagerIdentityDashProfiles.47378d97f886149fd501859465d719df";
  } else if (identifier.type === "universalName") {
    queryType = `universalName:${identifier.value}`;
    queryId =
      "voyagerOrganizationDashCompanies.2bb060c53305dd5cefdc76182795549e";
  } else {
    console.error("Invalid identifier type");
    return null;
  }

  // Properly construct the URL without manual encoding and without extra quotes around identifier values
  const graphqlUrl = `https://www.linkedin.com/voyager/api/graphql?includeWebMetadata=true&variables=(${queryType})&queryId=${queryId}`;

  return graphqlUrl;
};
