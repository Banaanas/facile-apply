import { ElementHandle } from "playwright";

export const handleRadioButtonFieldset = async (
  formControlContainer: ElementHandle,
) => {
  // Extract the label for the fieldset
  const fieldsetLabel =
    await extractRadioButtonFieldsetLabel(formControlContainer);
  console.log(`Fieldset Label: ${fieldsetLabel}`);
};

const extractRadioButtonFieldsetLabel = async (
  formControlContainer: ElementHandle,
) => {
  const legend = await formControlContainer.$("fieldset legend");

  if (legend) {
    // Remove visually hidden text from the legend text
    const visibleText = await legend.evaluate((node) => {
      const spans = node.querySelectorAll("span");
      let text = node.textContent || ""; // Ensure text is always a string
      spans.forEach((span) => {
        if (span.classList.contains("visually-hidden")) {
          text = text.replace(span.textContent || "", ""); // Ensure span textContent is a string
        }
      });
      return text.trim();
    });

    return visibleText;
  }
  return "";
};
