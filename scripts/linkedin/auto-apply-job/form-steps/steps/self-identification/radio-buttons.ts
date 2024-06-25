import { ElementHandle } from "playwright";

export const handleRadioButtonFieldset = async (
  formControlContainer: ElementHandle,
  formControlIdentifier: string,
) => {
  if (formControlIdentifier === "No Legend Text") {
    await handleNoLegendText(formControlContainer);
    return;
  }

  for (const { legend, label } of legendActions) {
    if (formControlIdentifier.includes(legend)) {
      await clickLabelByText(formControlContainer, label);
      return;
    }
  }

  console.error(`No matching legend found for: ${formControlIdentifier}`);
};

const handleNoLegendText = async (formControlContainer: ElementHandle) => {
  const isDisabilityLabelExist = await formControlContainer.$eval(
    "label",
    (labelNode) =>
      labelNode
        .getAttribute("data-test-text-selectable-option__label")
        ?.toLowerCase()
        .includes("disability"),
  );

  if (isDisabilityLabelExist) {
    const disabilityLabel = await formControlContainer.$(
      'label[data-test-text-selectable-option__label="No, I Don\'t Have A Disability, Or A History/Record Of Having A Disability"]',
    );

    await disabilityLabel?.click();
    return;
  }
  // Log error when no matching label found
  throw new Error('No matching label found for "disability"');
};

const clickLabelByText = async (
  formControlContainer: ElementHandle,
  label: string,
): Promise<void> => {
  const labelSelector = `label[data-test-text-selectable-option__label="${label}"]`;

  const labelElement = await formControlContainer.$(labelSelector);
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
