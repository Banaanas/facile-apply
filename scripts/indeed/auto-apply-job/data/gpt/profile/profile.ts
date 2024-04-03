import { cyrilLanguages } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/languages";
import { cyrilPersonalInfo } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/personal-info";
import { cyrilProfessionalExperiences } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/professional-experiences";
import { cyrilStudies } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/studies";

const createProfileSummary = () => {
  const personalInfoSummary = `
Name: ${cyrilPersonalInfo.name}, 
First Name: ${cyrilPersonalInfo.firstName}, 
Email: ${cyrilPersonalInfo.email}, 
Location: ${cyrilPersonalInfo.location.address}, ${cyrilPersonalInfo.location.city}, ${cyrilPersonalInfo.location.state}, ${cyrilPersonalInfo.location.postalCode}, ${cyrilPersonalInfo.location.country},
Professional Summary: ${cyrilPersonalInfo.professionalSummary}
`.trim();

  const experiencesSummary = cyrilProfessionalExperiences
    .map((exp) => `${exp.role} at ${exp.company} (${exp.duration})`)
    .join("; ");

  const languagesSummary = cyrilLanguages
    .map((lang) => `${lang.language}: ${lang.proficiency}`)
    .join(", ");

  const educationSummary = cyrilStudies.formalEducation
    .map((edu) => {
      let baseInfo = `${edu.degree} in ${edu.fieldOfStudy} from ${edu.institution} (${edu.startYear}-${edu.endYear})`;
      if (edu.notes && edu.notes.trim() !== "") {
        baseInfo += ` - Notes: ${edu.notes}`;
      }
      return baseInfo;
    })
    .join("; ");

  return `${personalInfoSummary}. Experiences: ${experiencesSummary}. Languages: ${languagesSummary}. Education: ${educationSummary}.`;
};

export const profileSummary = createProfileSummary();
