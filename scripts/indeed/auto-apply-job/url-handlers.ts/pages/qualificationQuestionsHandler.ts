import { IndeedJob } from "@prisma/client";
import { Page } from "playwright";

import { handlePageBasedOnUrl } from "@/scripts/indeed/auto-apply-job/apply-to-job";
import { generateDecision } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/question-utilities";
import { continueButtonRegex } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/inputs-regex";

export const qualificationQuestionsHandler = async (
  page: Page,
  indeedJobId: IndeedJob["id"],
) => {
  console.log("Handling Qualification Questions Page");

  const questionFieldsets = await page.$$("fieldset.css-1a5c5o6.e1ttgm5y0");

  for (const fieldset of questionFieldsets) {
    const legendText = await fieldset.$eval(
      "legend.css-ddheu4.es2vvo70",
      (el) => el.textContent,
    );

    if (!legendText) return;
    const prompt = `Do I have experience in ${legendText.replace("Experience: ", "")}? Answer only with "Yes" or "No".`;

    const gptDecision = await generateDecision(prompt);

    // Ensure the response is either "Yes" or "No"
    const valueToSelect =
      gptDecision.trim().toLowerCase() === "yes" ? "Yes" : "No";

    const selector = `input[type="radio"][value="${valueToSelect}"]`;
    await fieldset.$eval(selector, (radio) => radio.click());
  }

  await page.click(`text=${continueButtonRegex}`);
  console.log("Qualification Questions handled successfully.");
  await handlePageBasedOnUrl(page, indeedJobId);
};
