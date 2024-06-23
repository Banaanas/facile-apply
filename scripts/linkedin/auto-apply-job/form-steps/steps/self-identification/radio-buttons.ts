import { ElementHandle, Page } from "playwright";

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

export const handleRadioButtonFieldset = async (
  page: Page,
  section: ElementHandle,
  legendText: string,
) => {
  if (!legendText) {
    const isDisabilityLabelExist = await section.$eval("label", (labelNode) =>
      labelNode
        .getAttribute("data-test-text-selectable-option__label")
        ?.toLowerCase()
        .includes("disability"),
    );

    if (isDisabilityLabelExist) {
      const disabilityLabel = await section.$(
        'label[data-test-text-selectable-option__label="No, I Don\'t Have A Disability, Or A History/Record Of Having A Disability"]',
      );
      if (disabilityLabel) {
        await disabilityLabel.click();
        return;
      }
    }

    console.error('No matching label found for "disability"');
    return;
  }

  for (const { legend, label } of legendActions) {
    if (legendText.includes(legend)) {
      await clickLabelByText(section, label);
      return;
    }
  }

  console.error(`No matching legend found for: ${legendText}`);
};
const clickLabelByText = async (
  section: ElementHandle,
  label: string,
): Promise<void> => {
  const labelSelector = `label[data-test-text-selectable-option__label="${label}"]`;

  const labelElement = await section.$(labelSelector);
  if (labelElement) {
    await labelElement.click();
  }

  if (!labelElement) {
    console.error(`Label element with text "${label}" not found`);
  }
};

interface Interactions {
  legend: string;
  label: string;
}
