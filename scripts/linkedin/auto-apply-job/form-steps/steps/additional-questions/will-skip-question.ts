import { ElementHandle } from "playwright";

export const shouldSkipInput = async (
  inputs: (ElementHandle<SVGElement | HTMLElement> | null)[],
  selectDropdown: ElementHandle<HTMLSelectElement> | null,
  textarea: ElementHandle<HTMLTextAreaElement> | null,
): Promise<boolean> => {
  // Check for non-empty values or selected states in inputs
  for (const input of inputs) {
    if (!input) continue;

    const type = await input.getAttribute("type");

    if (
      (type === "checkbox" || type === "radio") &&
      (await input.evaluate((node) => (node as HTMLInputElement).checked))
    ) {
      return true;
    }

    if (type !== "checkbox" && type !== "radio") {
      const value = await input.inputValue();
      if (value.length > 0) return true;
    }
  }

  // Check select dropdown for a selected index
  if (
    selectDropdown &&
    (await selectDropdown.evaluate((select) => select.selectedIndex)) > 0
  ) {
    return true;
  }

  // Check textarea for non-empty value
  if (textarea && (await textarea.inputValue()).length > 0) {
    return true;
  }

  return false;
};
