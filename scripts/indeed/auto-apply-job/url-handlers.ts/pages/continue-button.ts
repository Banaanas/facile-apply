export const buttonLabels = {
  continue: [
    "Continuer",
    "Continue",
    "Déposer ma candidature",
    "Examiner ma candidature",
    "Review your application",
    "Submit your application",
  ],
};

const generateLabelRegex = (labels: Array<string>) => {
  const pattern = labels.join("|"); // Joins the labels with '|', creating a regex "or" pattern
  return new RegExp(`^(${pattern})$`, "i"); // Case-insensitive match
};

export const continueButtonRegex = generateLabelRegex(buttonLabels.continue);
