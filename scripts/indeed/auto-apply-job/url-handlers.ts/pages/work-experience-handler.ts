import { Page } from "playwright";

import { handlePageBasedOnUrl } from "@/scripts/indeed/auto-apply-job/apply-to-job";
import { continueButtonRegex } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/continue-button";
import { IndeedJob } from "@prisma/client";

export const workExperienceHandler = async (
  page: Page,
  indeedJobId: IndeedJob["id"],
) => {
  console.log("Filling in last work experience...");

  // Fill the job title input with "React and Next.js Developer"
  await page.fill('input[name="jobTitle"]', "React and Next.js Developer");
  console.log("Job title filled: React and Next.js Developer");

  // Fill the company name input with "Start-Up"
  await page.fill('input[name="companyName"]', "Start-Up");
  console.log("Company name filled: Start-Up");

  console.log("Last work experience details entered.");
  await page.click(`text=${continueButtonRegex}`);

  await handlePageBasedOnUrl(page, indeedJobId);
};
