import { Page } from "playwright";
import { ElementHandleForTag } from "playwright-core/types/structs";

import { cyrilSkills } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/skills";

export const isYearsOfExperienceQuestion = (labelText: string): boolean => {
  const keywords = [
    "année",
    "experience years",
    "expérience",
    "how many years",
    "years experience",
    "years of experience",
    "years of work experience",
  ];
  const lowerCaseLabel = labelText.toLowerCase();
  return keywords.some((keyword) => lowerCaseLabel.includes(keyword));
};

export const handleYearsOfExperienceQuestion = async (
  page: Page,
  inputField: ElementHandleForTag<"input"> | null,
  labelText: string | null,
) => {
  console.log("Starting the process to handle years of experience question");

  if (!inputField) {
    console.log("Input field is not defined.");
    return;
  }

  if (!labelText) {
    console.log("Label text is not defined.");
    return;
  }

  const WORK_EXPERIENCE_YEARS = "3";
  const lowerCaseLabel = labelText.toLowerCase();
  let skillFound = false;

  // Check if the label includes any of your skills or technologies
  for (const skill of cyrilSkills) {
    if (lowerCaseLabel.includes(skill.toLowerCase())) {
      console.log(`Skill '${skill}' found in label text`);
      await inputField?.fill(WORK_EXPERIENCE_YEARS);
      skillFound = true;
      break;
    }
  }

  // If no skill matches, log the URL and label text, then pause for manual intervention
  if (!skillFound) {
    const url = page.url();
    console.log(
      `Manual intervention required: URL: ${url}, Label: ${labelText}. ` +
        `Please apply manually because LinkedIn will store our answer. ` +
        `Next time, this skill will be treated automatically.`,
    );
    // Pause for manual intervention
    await page.pause();
  }
};
