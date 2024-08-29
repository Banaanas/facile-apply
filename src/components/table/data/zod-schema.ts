import { z } from "zod";

const CountryCodeEnum = z.enum([
  "CA",
  "CH",
  "FR",
  "US",
  "DK",
  "FI",
  "NL",
  "NO",
  "SE",
]); // Example values
const JobStatusEnum = z.enum(["Applied", "Ignored", "NotReviewed"]); // Example values
const PostStatusEnum = z.enum(["Applied", "Ignored", "NotReviewed"]); // Example values

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

export const linkedinPostSchema = z.object({
  id: z.number(),
  authorProfileUrl: z.string().optional().nullable(),
  authorCountry: z.string().optional().nullable(),
  authorName: z.string(),
  postDate: z.date(),
  postUrl: z.string(),
  profilePhotoUrl: z.string().optional().nullable(),
  summary: z.string(),
  status: PostStatusEnum,
  trackingUrn: z.string(),
});
