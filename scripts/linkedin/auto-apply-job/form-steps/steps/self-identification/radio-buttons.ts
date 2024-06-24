import { ElementHandle, Page } from "playwright";

export const handleRadioButtonFieldset = async (
  page: Page,
  container: ElementHandle,
  radioButtonFieldset: ElementHandle,
) => {
  let legendText = "No Legend Text";

  try {
    legendText = await radioButtonFieldset.$eval(
      "legend span",
      (node) => (node as HTMLElement).innerText,
    );
  } catch (error) {
    // If no legend span is found, use the default 'No Legend Text'
  }

  if (legendText === "No Legend Text") {
    await handleNoLegendText(container);
    return;
  }

  for (const { legend, label } of legendActions) {
    if (legendText.includes(legend)) {
      await clickLabelByText(container, label);
      return;
    }
  }

  console.error(`No matching legend found for: ${legendText}`);
};

const handleNoLegendText = async (container: ElementHandle) => {
  const isDisabilityLabelExist = await container.$eval("label", (labelNode) =>
    labelNode
      .getAttribute("data-test-text-selectable-option__label")
      ?.toLowerCase()
      .includes("disability"),
  );
  if (isDisabilityLabelExist) {
    const disabilityLabel = await container.$(
      'label[data-test-text-selectable-option__label="No, I Don\'t Have A Disability, Or A History/Record Of Having A Disability"]',
    );

    await disabilityLabel?.click();
    return;
  }
  // Log error when no matching label found
  throw new Error('No matching label found for "disability"');
};

const clickLabelByText = async (
  container: ElementHandle,
  label: string,
): Promise<void> => {
  const labelSelector = `label[data-test-text-selectable-option__label="${label}"]`;

  const labelElement = await container.$(labelSelector);
  if (labelElement) {
    await labelElement.click();
  }

  if (!labelElement) {
    console.error(`Label element with text "${label}" not found`);
  }
};

const YES = "Yes";
const NO = "No, I do not have a disability and have not had one in the past.";

const legendActions: Array<Interactions> = [
  {
    legend: "Are you a protected veteran?",
    label: YES,
  },
  {
    legend: "Are you Hispanic or Latino?",
    label: YES,
  },
  {
    legend: "Do you have (or have a history/record of having) a disability?",
    label: NO,
  },
];

interface Interactions {
  legend: string;
  label: string;
}
