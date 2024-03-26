import {
  ConnectionMode,
  Headless,
  runPlaywrightSession,
} from "@/scripts/indeed/auto-apply-job/launch-browser/playwright-connection";

const INITIAL_URL =
  "https://ch.indeed.com/viewjob?jk=5a908a036bc84061&from=serp&vjs=3";

async function main() {
  const connectionMode: ConnectionMode = "local";
  const headless: Headless = false;
  const url: string = INITIAL_URL;

  try {
    await runPlaywrightSession(connectionMode, headless, url);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main().catch(console.error);
