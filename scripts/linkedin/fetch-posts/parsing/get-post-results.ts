import { fetchResultsWithProvider } from "@/scripts/linkedin/fetch-jobs/requests/provider-fetch-functions";
import {
  RawLinkedinPostData,
  TransformedScrapedLinkedinPost,
} from "@/scripts/linkedin/fetch-posts/parsing/linkedin-api-response-posts-types";
import { transformLinkedinPostResults } from "@/scripts/linkedin/fetch-posts/parsing/transform-post-results";

export const getPostResults = async (
  linkedinSearch: string,
): Promise<Array<TransformedScrapedLinkedinPost>> => {
  let start = 0;
  let totalPostsCount = 0;
  const allPosts = []; // Array to accumulate all posts
  let isFirstRequest = true; // Flag to indicate if it's the first request

  while (isFirstRequest || allPosts.length < totalPostsCount) {
    const urlWithPagination = linkedinSearch.replace(
      /&start=\d+/,
      `&start=${start}`,
    );

    const rawData: RawLinkedinPostData = (await fetchResultsWithProvider(
      urlWithPagination,
    )) as RawLinkedinPostData;

    if (isFirstRequest && rawData.data.searchDashClustersByAll.paging) {
      totalPostsCount = rawData.data.searchDashClustersByAll.paging.total; // Get the total count from the first request

      isFirstRequest = false; // No longer the first request
    }

    // Assuming you'll implement a function to extract and transform posts from rawData
    const transformedPosts = await transformLinkedinPostResults(
      rawData.data.searchDashClustersByAll.elements,
    );

    allPosts.push(...transformedPosts);

    start += transformedPosts.length; // Prepare for fetching the next page
    if (allPosts.length >= totalPostsCount) {
      break; // Exit the loop if we have fetched all expected posts
    }
  }

  return allPosts; // Return the accumulated list of posts
};
