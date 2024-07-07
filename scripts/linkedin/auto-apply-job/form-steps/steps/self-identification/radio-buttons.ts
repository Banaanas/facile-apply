import { ElementHandle } from "playwright";

export const handleRadioButtonFieldset = async (
  formControlContainer: ElementHandle,
  formControlIdentifier: string,
) => {
  if (formControlIdentifier === "No Legend Text") {
    await handleNoLegendText(formControlContainer);
    return;
  }

  const normalizedIdentifier = formControlIdentifier.toLowerCase();

  const legendAction = legendActions.find(({ legends }) =>
    legends.some((legend) =>
      normalizedIdentifier.includes(legend.toLowerCase()),
    ),
  );

  if (!legendAction) {
    console.error(`No matching legend found for: ${formControlIdentifier}`);
    return;
  }

  for (const label of legendAction.labels) {
    await clickLabelByText(formControlContainer, label);
  }
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
  const labelElements = await formControlContainer.$$("label");

  let foundLabelElement: ElementHandle | null = null;

  for (const labelElement of labelElements) {
    const labelText = await labelElement.innerText();

    if (labelText.toLowerCase().includes(label.toLowerCase())) {
      foundLabelElement = labelElement;
      break;
    }
  }

  if (!foundLabelElement) {
    console.error(`Label element with text "${label}" not found`);
    return;
  }

  await foundLabelElement.click();
};

interface Interactions {
  legends: Array<string>;
  labels: Array<string>;
}

const legendActions: Array<Interactions> = [
  {
    legends: ["gender"],
    labels: ["Male"],
  },
  {
    legends: ["veteran status", "protected veteran"],
    labels: ["I am not a protected veteran"],
  },
  {
    legends: ["disability"],
    labels: ["I don't have a disability,", "I do not have a disability"],
  },
];
