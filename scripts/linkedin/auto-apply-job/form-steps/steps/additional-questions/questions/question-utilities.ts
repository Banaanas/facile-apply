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

  const prompt = `Question: ${questionText} Options: ${optionsText.join(", ")}. Based on the options, which should be selected? Provide the exact option text, case-sensitive, with no additional words or punctuation. The answer must be one of the following options: [${optionsText.join(", ")}]`;

  return prompt;
};

const extractVisibleTextFromLegend = (legend: HTMLLegendElement) => {
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
      const nestedSpanText = nestedSpans
        .map((nestedSpan) => nestedSpan.textContent?.trim() ?? "")
        .join(" ");
      const spanText = span.textContent?.trim() ?? "";
      // Remove nested span text from span text
      return spanText.replace(nestedSpanText, "").trim();
    })
    .join(" ");

  return visibleText.trim();
};

export const clickRadioButtonBasedOnDecision = async (
  container: ElementHandle<SVGElement | HTMLElement>,
  decision: string,
) => {
  const labels = await container.$$("label");
  for (const label of labels) {
    const labelText = await label.evaluate(
      (el) => el.textContent?.trim() ?? "",
    );
    // Ensure only punctuation is removed; avoid affecting the first letter
    const normalizedLabelText = labelText
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .toLowerCase()
      .trim();
    const normalizedDecision = decision
      .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, "")
      .trim();

    // Construct the selector string to find the label
    const labelSelector = `label[data-test-text-selectable-option__label="${normalizedDecision}"]`;

    // Find the label element using the constructed selector
    const labelElement = await container.$(labelSelector);

    console.log("LABEL", labelElement);

    // Use strict comparison for accuracy
    if (labelElement) {
      // Click the label element, which should select the corresponding radio button
      await labelElement.click();
      console.log("Radio button clicked for decision:", decision);
      break; // Exit the loop after clicking
    }
  }
};
