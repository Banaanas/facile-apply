import * as cheerio from "cheerio";

export const getNextPageUrl = (
  htmlPage: string,
  domain: string,
): string | undefined => {
  const $ = cheerio.load(htmlPage);
  const nextPageLink = $('a[data-testid="pagination-page-next"]');

  if (nextPageLink.length > 0) {
    const relativePath = nextPageLink.attr("href");
    if (relativePath) {
      return `${domain}${relativePath}`;
    }
  }

  return undefined;
};
