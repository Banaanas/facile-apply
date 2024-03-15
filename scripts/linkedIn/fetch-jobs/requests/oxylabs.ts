import axios from "axios";
import { oxylabsConfig } from "@/scripts/config"; // Ensure this is correctly imported

// Refactor to accept additional headers
export const fetchLikedInOxylabs = async (
  url: string,
  additionalHeaders = {},
) => {
  console.log("Fetching with Oxylabs Provider");

  if (
    !oxylabsConfig.endpoint ||
    !oxylabsConfig.username ||
    !oxylabsConfig.password
  ) {
    throw new Error(
      "One or more required Oxylabs environment variables are not defined.",
    );
  }

  const body = {
    source: "universal",
    url,
    geo_location: "United States",
    render: "html",
    // Include additional headers, if any, in the request
    headers: additionalHeaders,
  };

  try {
    const response = await axios.post(oxylabsConfig.endpoint, body, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Basic ${Buffer.from(`${oxylabsConfig.username}:${oxylabsConfig.password}`).toString("base64")}`,
        // Potentially include other headers required by Oxylabs here
      },
    });

    return response.data.results[0].content;
  } catch (error) {
    console.error(`Error fetching page with Oxylabs: ${error}`);
    throw error;
  }
};
