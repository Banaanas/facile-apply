import dotenv from "dotenv";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

// __dirname is not available in ES modules, so we derive it
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: path.join(__dirname, "../.env.local") });

// PROXIES PROVIDER
export const brightDataConfig = {
  host: process.env.BRIGHT_DATA_PROXY_HOST,
  port: process.env.BRIGHT_DATA_PROXY_PORT,
  user: process.env.BRIGHT_DATA_PROXY_USER,
  pass: process.env.BRIGHT_DATA_PROXY_PASS,
  scrapingBrowserCDP: process.env.BRIGHT_DATA_SCRAPING_BROWSER_CDP,
};

export const iproyalConfig = {
  host: process.env.IPROYAL_HOST,
  port: process.env.IPROYAL_PORT,
  username: process.env.IPROYAL_USERNAME,
  password: process.env.IPROYAL_PASSWORD,
};

export const oxylabsConfig = {
  endpoint: process.env.OXYLABS_ENDPOINT,
  username: process.env.OXYLABS_USERNAME,
  password: process.env.OXYLABS_PASSWORD,
};

export const rapidApiConfig = {
  key: process.env.RAPIDAPI_KEY,
  host: process.env.RAPIDAPI_HOST,
};

export const scrapflyConfig = {
  apiKey: process.env.SCRAPFLY_API_KEY,
};

export const zenrowsConfig = {
  apiKey: process.env.ZENROWS_API_KEY,
  apiUrl: process.env.ZENROWS_URL,
};

// LINKEDIN
export const linkedInConfig = {
  jsessionId: "ajax:5549443845052618283",
  liat: "AQEDAUyQqUMEdli3AAABjkIxcp8AAAGOZj32n00AoFqNpcUDuj4vFiprxY3ABxohVF-gluYiVALUdFih1blowBl9a4WiMMgixASFX66_FuLHfBuDckuDLg4oC5Ut4ZpRw0vsakG9W1PBMQdtuOsg_YKU",
};
