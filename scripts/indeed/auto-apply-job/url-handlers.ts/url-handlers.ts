// Define a mapping of URL patterns to handler functions
import { IndeedJob } from "@prisma/client";
import { Page } from "playwright";

import { contactInfoHandler } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/contact-info-handler";
import { documentsHandler } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/documents-handler";
import { indeedApplyPageHandler } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/indeed-apply-handler";
import { oocQuestionHandler } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/ooc-question-handler";
import { profileLocationHandler } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/profile-location-handler";
import { qualificationQuestionsHandler } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/qualificationQuestionsHandler";
import { resumeHandler } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/resume-handler";
import { reviewHandler } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/review-handler";
import { workExperienceHandler } from "@/scripts/indeed/auto-apply-job/url-handlers.ts/pages/work-experience-handler";

export const BASE_URL = "https://smartapply.indeed.com/beta/indeedapply/form/";

export const urlHandlers: {
  [key: string]: HandlerFunction;
} = {
  [`${BASE_URL}contact-info`]: contactInfoHandler,
  [`${BASE_URL}documents`]: documentsHandler,
  [`${BASE_URL}ooc-question`]: oocQuestionHandler,
  [`${BASE_URL}profile-location`]: profileLocationHandler,
  [`${BASE_URL}qualification-questions`]: qualificationQuestionsHandler,
  [`${BASE_URL}resume`]: resumeHandler,
  [`${BASE_URL}review`]: reviewHandler,
  [`${BASE_URL}work-experience`]: workExperienceHandler,

  "/indeedapply/postresumeapply": indeedApplyPageHandler,
};

export type HandlerFunction = (
  page: Page,
  indeedJobId: IndeedJob["id"],
) => Promise<void>;
