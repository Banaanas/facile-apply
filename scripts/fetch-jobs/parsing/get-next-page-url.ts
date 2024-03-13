import * as cheerio from "cheerio";
import path from "node:path";
import * as fs from "node:fs";

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
  } else {
    // No next page link found, save HTML for debugging
    const debugFilePath = path.join(__dirname, "debugHtmlPage.html");
    fs.writeFileSync(debugFilePath, htmlPage);
    console.log(`Current page HTML saved for debugging: ${debugFilePath}`);
  }

  return undefined;
};
