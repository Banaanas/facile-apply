import { IndeedJob } from "@prisma/client";
import { Page } from "playwright";

import { handlePageBasedOnUrl } from "@/scripts/indeed/auto-apply-job/apply-to-job";
import { continueButtonRegex } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/inputs-regex";
import { generateAnswer } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/question-utilities";

export const documentsHandler = async (
  page: Page,
  indeedJobId: IndeedJob["id"],
) => {
  console.log("Handling Documents Page");

  // Check if the "Apply without cover letter" option is present
  const noCoverLetterOptionVisible = await page.isVisible(
    'span[data-testid="NoCoverLetterRadioCardHeader-title"]',
  );

  // Directly use the `page` object to find the textarea
  const coverLetterTextarea = await page.$(
    'textarea[data-testid="CoverLetter-textarea"]',
  );
  if (coverLetterTextarea && !noCoverLetterOptionVisible) {
    // Since there's no container, you might need to adjust how you obtain the label text
    // This assumes there's a uniquely identifiable label for the textarea
    const label = await page.$eval(
      'label[data-testid="CoverLetter-label"]',
      (el) => el.textContent || "",
    );
    console.log("Handling Cover Letter Input:", label);

    const prompt =
      "Generate a concise, professional cover letter for a Web Developer position. The candidate specializes in the JavaScript ecosystem, with expertise in TypeScript, React, and Next.js. They have a strong portfolio showcased at https://cyrilo.dev/. The candidate is located in France and is interested in remote opportunities that allow them to contribute to innovative web technology projects. They are keen on joining a team where they can apply their skills to create user-centric applications and push the boundaries of web development. The cover letter should express enthusiasm for the position, highlight the candidate's relevant skills and experience, and convey a desire to contribute significantly to the team.";
    const coverLetterContent = await generateAnswer(prompt);

    await coverLetterTextarea.fill(coverLetterContent);
  }

  await page.click(`text=${continueButtonRegex}`);
  console.log("Documents handled successfully.");
  await handlePageBasedOnUrl(page, indeedJobId);
};
