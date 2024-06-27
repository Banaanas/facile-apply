import console from "node:console";

import { ElementHandle } from "playwright";

export const radioInputQuestionPrompt = async (
  container: ElementHandle<SVGElement | HTMLElement>,
) => {
  const questionText = await container.$eval(
    "legend",
    extractVisibleTextFromLegend,
  );
  const optionsText = await container.$$eval("label", (labels) =>
    labels.map((label) => label.textContent?.trim() ?? ""),
  );

  console.log("QUESTION", questionText);
  console.log("OPTIONS", optionsText);

  const prompt = `Question: ${questionText} Options: ${optionsText.join(", ")}. Based on the options, which should be selected? Provide the exact option text, case-sensitive, with no additional words or punctuation. The answer must be one of the following options: [${optionsText.join(", ")}]`;

  return prompt;
};

const extractVisibleTextFromLegend = async (legend: HTMLLegendElement) => {
  const firstLevelSpans = Array.from(legend.children).filter(
    (span) =>
      span.tagName.toLowerCase() === "span" &&
      !span.classList.contains("visually-hidden"),
  );

  const visibleText = firstLevelSpans
    .map((span) => {
      const nestedSpans = Array.from(
        span.querySelectorAll('span[aria-hidden="true"]'),
      );
      nestedSpans.forEach((nestedSpan) => nestedSpan.remove());
      return span.textContent?.trim() ?? "";
    })
    .join(" ");

  return visibleText.trim();
};
