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
  inputField: ElementHandleForTag<"input">,
  labelText: string,
) => {
  console.log("Starting the process to handle years of experience question");

  const WORK_EXPERIENCE_YEARS = "3";
  const lowerCaseLabel = labelText.toLowerCase();
  // Check if the label includes any of our skills or technologies
  for (const skill of cyrilSkills) {
    if (lowerCaseLabel.includes(skill.toLowerCase())) {
      console.log(`Skill '${skill}' found in label text`);
      await inputField.fill(WORK_EXPERIENCE_YEARS);
    } else {
      console.log(`Skill '${skill}' not found in label text`);
    }
  }
};
