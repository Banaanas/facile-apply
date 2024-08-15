
import chalk from "chalk";
import { prisma } from "@prisma/db.server";
import { chromium, firefox } from "playwright";
import { blockResourcesAndAds } from "@/scripts/utils/playwright-block-ressources";
import { updateIndeedJobStatus } from "@/actions";

const applyToIndeedJobs = async () => {
  console.log(chalk.blue("Starting the job application process..."));

  // Fetch jobs that are not reviewed and do not have indeedApplyEnabled
  const jobs = await prisma.indeedJob.findMany({
    where: {
      status: "NotReviewed",
    },
  });

  if (jobs.length === 0) {
    console.log(chalk.yellow("No jobs found that meet the criteria."));
    return;
  }

  console.log(chalk.blue(`Found ${jobs.length} jobs to process.`));

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const job of jobs) {
    console.log(chalk.blue(`Processing job with ID: ${job.id}`));

    // Open the job's URL in Playwright
    await blockResourcesAndAds(page);

    await page.goto(job.link);

    // Check if the job is obsolete or has already been applied to
    const isObsolete = await checkAndUpdateIfJobIsObsolete(job.id, job.link);

    // If the job is obsolete or already applied, skip further processing
    if (isObsolete ) {
      console.log(chalk.red(`Skipping job with ID: ${job.id}.`));
      console.log(chalk.bgBlue(job.link));
    } else {
      // If the job is still viable
      console.log(chalk.green(`Job with ID: ${job.id} is still viable.`));
      console.log(chalk.bgCyanBright(job.link));
    }
  }

  await context.close();
  await browser.close();
  console.log(
    chalk.bgMagentaBright.whiteBright.bold("JOB APPLICATION PROCESS COMPLETED"),
  );
};

// Run the script
applyToIndeedJobs().catch((error) => {
  console.error(chalk.red("Error during job application process:"), error);
});




// Function to check if a job is obsolete and update the status
export const checkAndUpdateIfJobIsObsolete = async (
  indeedJobId: number,
  jobUrl: string
): Promise<boolean> => {
  try {
    const htmlContent = await fetchIndeedVPN(jobUrl);

    const hasExpiredNotice = htmlContent.includes("This job has expired on Indeed") ||
      htmlContent.includes("Cette offre a expiré sur Indeed");

    const hasNotFoundNotice = htmlContent.includes("We can't find this page") ||
      htmlContent.includes("Page introuvable");

    if (hasExpiredNotice || hasNotFoundNotice) {
      await updateIndeedJobStatus(indeedJobId, "Ignored");
      console.log(
        chalk.red(
          `Job ${indeedJobId} has been marked as Ignored due to being obsolete.`,
        ),
      );
      return true;
    }

    return false;
  } catch (error) {
    console.error(chalk.red(`Error checking if job is obsolete: ${error.message}`));
    return false;
  }
};

export const fetchIndeedVPN = async (targetUrl: string): Promise<string> => {
  // await verifyVPNUsage();  // Ensure the VPN is in use

  try {
    // Launch the Chromium browser instance
    const browser = await chromium.launch({
      headless: true,  // Run in headless mode for efficiency
    });

    const context = await browser.newContext({
      userAgent: "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
      viewport: { width: 1280, height: 800 },  // Standard viewport size
    });

    const page = await context.newPage();

    // Navigate to the target URL, waiting for the DOM content to be loaded
    await page.goto(targetUrl, { waitUntil: "domcontentloaded" });

    // Optional: Block unnecessary resources like images, stylesheets, etc., to speed up the process
    await page.route('**/*', (route) => {
      const request = route.request();
      if (['image', 'stylesheet', 'font', 'media'].includes(request.resourceType())) {
        route.abort();
      } else {
        route.continue();
      }
    });

    // Capture the HTML content of the page
    const content = await page.content();

    // Close the browser instance
    await browser.close();

    // Return the HTML content
    return content;
  } catch (error) {
    console.error(`Error fetching content from ${targetUrl}:`, error);
    throw error;
  }
};
