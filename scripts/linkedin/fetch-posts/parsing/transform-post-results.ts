import { LinkedinPost } from "@prisma/client";

import { fetchAuthorCountryFromPostItem } from "@/scripts/linkedin/fetch-posts/parsing/get-author-post-country";
import {
  PostItem,
  SearchClusterViewModel,
  TransformedScrapedLinkedinPost,
} from "@/scripts/linkedin/fetch-posts/parsing/linkedin-api-response-posts-types";
import { convertRelativeTimeToDate } from "@/scripts/linkedin/fetch-posts/utils/convert-time-date";

export const transformLinkedinPostResults = async (
  elements: SearchClusterViewModel[],
): Promise<Array<TransformedScrapedLinkedinPost>> => {
  // First, map each element to a potentially transformed post item (as promises)
  const promises = elements.flatMap((element) =>
    element.items.map((item) => extractLinkedinPostDetails(item)),
  );

  // Resolve all promises
  const resolvedItems = await Promise.all(promises);

  // Then, filter out any undefined items from the resolved results
  const filteredItems = resolvedItems.filter(
    (item): item is TransformedScrapedLinkedinPost => item !== undefined,
  );

  return filteredItems;
};

export const extractLinkedinPostDetails = async (
  postItem: PostItem,
): Promise<TransformedScrapedLinkedinPost | undefined> => {
  const { entityResult } = postItem.item;

  // Check if the summary is not available
  if (!entityResult?.summary?.text) {
    return undefined; // Or `return;` which is equivalent to `return undefined;`
  }

  const authorName = entityResult?.title.text;
  const summary = entityResult?.summary.text;
  const authorProfileUrl = entityResult?.actorNavigationUrl;
  const postUrl = entityResult?.navigationUrl;
  const trackingUrn = entityResult?.trackingUrn;

  // Some profiles don't have photo
  const profilePhotoUrl =
    entityResult?.image?.attributes[0]?.detailData?.nonEntityProfilePicture
      ?.vectorImage?.artifacts[0]?.fileIdentifyingUrlPathSegment ?? null;

  // Extract post's relative timestamp
  const relativeTimeString = entityResult?.secondarySubtitle?.text || "";
  const postDate = convertRelativeTimeToDate(relativeTimeString);

  const authorCountry = await fetchAuthorCountryFromPostItem(postItem);

  // Create defaults status
  const status: LinkedinPost["status"] = "NotReviewed";

  return {
    authorName,
    authorProfileUrl,
    authorCountry,
    postUrl,
    postDate,
    profilePhotoUrl,
    status,
    summary,
    trackingUrn,
  };
};
