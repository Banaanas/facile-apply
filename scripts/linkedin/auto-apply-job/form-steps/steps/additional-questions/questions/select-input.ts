import { ElementHandle } from "playwright";

import { generateAnswer } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/question-utilities";

// Function to select the option in the dropdown that matches the GPT-3 decision
export const handleSelectInput = async (
  formControlContainer: ElementHandle<SVGElement | HTMLElement>,
) => {
  const selectDropdown = await formControlContainer.$("select");
  if (!selectDropdown) {
    return;
  }

  const optionsTexts = await selectDropdown?.$$eval("option", (options) =>
    options.map((option) => option.textContent?.trim() || ""),
  );
  const prompt = `Given these options: ${optionsTexts?.join(", ")}, which should be selected for the shortest answer possible? Please provide only the name.`;

  const decision = await generateAnswer(prompt);

  await selectDropdownFromDecision(selectDropdown, decision);
};

export const selectDropdownFromDecision = async (
  selectDropdown: ElementHandle<SVGElement | HTMLElement>,
  decision: string, // Decision received from GPT
) => {
  const options = await selectDropdown.$$("option");
  for (const option of options) {
    const optionText = await option.textContent();

    // Adjust the condition to check if the option text includes the decision
    if (
      optionText?.trim().toLowerCase().includes(decision.trim().toLowerCase())
    ) {
      const value = await option.getAttribute("value");
      if (value !== null) {
        await selectDropdown.selectOption({ value });
        break; // Break after finding and selecting the correct option
      }
    }
  }
};
