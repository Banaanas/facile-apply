import { ElementHandle } from "playwright";

export const getLabelForElement = async (
  formControlContainer: ElementHandle,
  element: ElementHandle,
): Promise<string | null> => {
  const elementId = await element.getAttribute("id");

  if (elementId) {
    // Find the corresponding label using the 'for' attribute
    const label = await formControlContainer.$(`label[for="${elementId}"]`);
    if (label) {
      const labelText = await label.innerText();
      return labelText;
    }
  }

  // For elements without 'id' attribute, look for the parent fieldset's legend
  const fieldset = await element.$("ancestor::fieldset");
  if (fieldset) {
    const legend = await fieldset.$("legend");
    if (legend) {
      const legendText = await legend.innerText();
      return legendText;
    }
  }

  return null;
};
