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

export type Task = z.infer<typeof indeedJobSchema>;
