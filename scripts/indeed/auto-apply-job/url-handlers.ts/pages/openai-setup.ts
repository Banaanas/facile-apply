import OpenAI from "openai";

import { openAiConfig } from "@/scripts/config";
import { profileSummary } from "@/scripts/indeed/auto-apply-job/data/gpt/profile/profile";

export const openai = new OpenAI({
  apiKey: openAiConfig.apiKey,
});

export const initialGPTContext = `
You are a helpful assistant aiding in filling out a job application form. Please provide concise and relevant answers based on the questions or labels provided. Here is a brief overview of my professional background: ${profileSummary}. Please, take also into account those
`;
