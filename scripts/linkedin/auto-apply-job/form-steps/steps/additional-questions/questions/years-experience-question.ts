import { ElementHandleForTag } from "playwright-core/types/structs";

import { cyrilSkills } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/skills";

export const isYearsOfExperienceQuestion = (labelText: string): boolean => {
  const keywords = [
    "years of work experience",
    "experience years",
    "years experience",
    "years",
    "expérience",
    "année",
  ];
  const lowerCaseLabel = labelText.toLowerCase();
  return keywords.some((keyword) => lowerCaseLabel.includes(keyword));
};

export const handleYearsOfExperienceQuestion = async (
  inputField: ElementHandleForTag<"input">,
  labelText: string,
) => {
  const WORK_EXPERIENCE_YEARS = "3";
  const lowerCaseLabel = labelText.toLowerCase();

  // Check if the label includes any of our skills or technologies
  for (const skill of cyrilSkills) {
    if (!lowerCaseLabel.includes(skill)) return;

    await inputField.fill(WORK_EXPERIENCE_YEARS);
  }
};
