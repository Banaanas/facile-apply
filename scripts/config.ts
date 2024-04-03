import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// __dirname is not available in ES modules, so we derive it
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env.local") });

// INDEED PROXY PROVIDER
export const scrapingFishConfig = {
  apiKey: process.env.SCRAPING_FISH_API_KEY,
  apiUrl: process.env.SCRAPING_FISH_URL,
};

// LINKEDIN
export const linkedinConfig = {
  jsessionId: process.env.LINKEDIN_JSESSIONID,
  liAt: process.env.LINKEDIN_LIAT,
};

// LINKEDIN PROXY PROVIDER
export const ipRoyalConfig = {
  host: process.env.IPROYAL_HOST_SOCKS5,
  port: process.env.IPROYAL_PORT_SOCKS5,
  username: process.env.IPROYAL_USERNAME,
  password: process.env.IPROYAL_PASSWORD,
};

// OPENAI
export const openAiConfig = {
  apiKey: process.env.OPENAI_API_KEY,
};
