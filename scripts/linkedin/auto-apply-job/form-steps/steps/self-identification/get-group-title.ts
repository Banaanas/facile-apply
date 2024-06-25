import colors from "colors";
import { ElementHandle } from "playwright";

export const getClosestGroupTitle = async (
  container: ElementHandle,
): Promise<string> => {
  console.log(colors.cyan("Starting search for group title..."));

  // Start with the previous sibling of the container
  let siblingNode = await container.evaluateHandle(
    (node) => (node as Element).previousElementSibling,
  );

  while (siblingNode) {
    const siblingNodeElement = siblingNode.asElement();
    if (!siblingNodeElement) {
      break;
    }

    // Check if the sibling is another form element container
    const isFormElementContainer = await siblingNode.evaluate((node) => {
      return (node as Element).classList.contains(
        "jobs-easy-apply-form-section__grouping",
      );
    });

    if (isFormElementContainer) {
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
  console.log(colors.cyan(noTitleFoundMessage));
  return noTitleFoundMessage;
};
