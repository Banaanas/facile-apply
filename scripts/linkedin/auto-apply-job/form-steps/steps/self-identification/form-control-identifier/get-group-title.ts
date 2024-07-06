import colors from "colors";
import { ElementHandle } from "playwright";

// Sometimes, when we don't have no label, we can look for a group title that will serve us as label for our Form Container
export const getClosestGroupTitle = async (
  formControlContainer: ElementHandle,
): Promise<string> => {
  console.log(colors.cyan("Starting search for group title..."));

  // Start with the previous sibling of the container
  let siblingNode = await formControlContainer.evaluateHandle(
    (node) => (node as Element).previousElementSibling,
  );

  while (siblingNode) {
    const siblingNodeElement = siblingNode.asElement();
    if (!siblingNodeElement) {
      break;
    }

    // Check if the sibling is another form element container
    const isAnotherFormControlContainer = await siblingNode.evaluate((node) => {
      return (node as Element).classList.contains(
        "jobs-easy-apply-form-section__grouping",
      );
    });

    // If another form element container is encountered, the search stops.
    // This indicates that the next group title found will belong to this new form element container,
    // not the current one we are investigating. Therefore, it means there is no group title for the current form element.
    if (isAnotherFormControlContainer) {
      console.log(
        colors.cyan("Encountered another form element, stopping search."),
      );
      break;
    }

    // Check if the sibling is the group title
    const isGroupTitle = await siblingNode.evaluate(
      (node) =>
        node?.tagName.toLowerCase() === "span" &&
        node.classList.contains("jobs-easy-apply-form-section__group-title"),
    );

    if (isGroupTitle) {
      const titleText = await siblingNode.evaluate(
        (node) => node?.textContent || "",
      );
      return titleText;
    }

    // Move to the previous sibling
    siblingNode = await siblingNode.evaluateHandle(
      (node) => (node as Element).previousElementSibling,
    );
  }

  const noTitleFoundMessage = "No group title found";
  return noTitleFoundMessage;
};
