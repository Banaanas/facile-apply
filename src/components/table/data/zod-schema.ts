import { z } from "zod";

const CountryCodeEnum = z.enum(["CA", "CH", "FR", "US"]); // Example values
const JobStatusEnum = z.enum(["Applied", "Ignored", "NotReviewed"]); // Example values

export const indeedJobSchema = z.object({
  id: z.number(),
  country: CountryCodeEnum,
  createDate: z.date(),
  company: z.string(),
  indeedApplyEnabled: z.boolean(),
  jobkey: z.string(),
  title: z.string(),
  link: z.string(),
  status: JobStatusEnum,
});

export const linkedinJobSchema = z.object({
  id: z.number(),
  company: z.string(),
  createDate: z.date(),
  easyApply: z.boolean(),
  jobUrn: z.string(),
  link: z.string(),
  location: z.string(),
  status: JobStatusEnum,
  title: z.string(),
});
