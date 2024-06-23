import { createCursor } from "ghost-cursor-playwright";
import { Page } from "playwright";

// Initialize the ghost cursor to simulate human-like cursor movements
// This helps in avoiding bot detection mechanisms like Datadome by making the interactions appear more natural.
// Reference: https://substack.thewebscraping.club/p/bypass-datadome-mouse-movements-in-playwright
export const humanLikeMoveAndClick = async (page: Page, selector: string) => {
  const cursor = await createCursor(page);

  // Move cursor to the selector with human-like behavior
  await cursor.actions.move(selector, {
    paddingPercentage: 10,
    waitBeforeMove: [100, 150],
    waitForSelector: 3000,
  });

  // Click the selector with a slight delay to simulate human behavior
  await cursor.actions.click({ waitBeforeClick: [400, 800] });
};
