import OpenAI from "openai";

import { openAiConfig } from "@/scripts/config";

const openai = new OpenAI({
  apiKey: openAiConfig.apiKey,
});
async function main() {
  const { apiKey } = openAiConfig;

  const completion = await openai.chat.completions.create({
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: "How does photosynthesis work?" }, // Your question
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
}

main();
