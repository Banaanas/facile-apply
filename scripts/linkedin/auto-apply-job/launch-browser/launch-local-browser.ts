// Launch Firefox with a Persistent Context
import { BrowserContext, firefox, chromium } from "playwright";

const userDataDirPath = "/Users/cyril/Desktop/PWUser";

/*
Launches a local browser with a persistent context. Data are stored through browser's connections into the userDataDirPath.
*/
export const launchLocalBrowser = async (
  headless: boolean,
): Promise<BrowserContext> => {
  console.log("Launching Local Browser with Persistent Context...");

  try {
    const context = await firefox.launchPersistentContext(userDataDirPath, {
      headless,
      devtools: !headless,
    });

    console.log("Browser with Persistent Context launched.");

    return context;
  } catch (error) {
    console.error("Error launching Browser with Persistent Context:", error);
    throw new Error("Failed to launch Browser with Persistent Context.");
  }
};
