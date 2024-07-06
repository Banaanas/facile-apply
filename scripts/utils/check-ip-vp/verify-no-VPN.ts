import axios from "axios";
import chalk from "chalk";

/**
 * To use our bot on Indeed and Linkedin, it's better to not use a VPN but our real IP.
 * This script checks if the current IP address indicates the use of a VPN.
 * It fetches the IP address and its geographical information, and compares it with
 * the expected location.
 */

const expectedCountry = "FR"; // Expected country code for France
const expectedRegion = "Auvergne-Rhône-Alpes"; // Expected region

export const verifyNoVPNUsage = async () => {
  const ipApi = "https://ipinfo.io";

  try {
    // Fetch the current IP address and its geographical information
    const response = await axios.get(ipApi);
    const { ip, country, region } = response.data;

    console.log(chalk.blue(`Current IP: ${ip}`));
    console.log(chalk.blue(`Country: ${country}`));
    console.log(chalk.blue(`Region: ${region}`));

    // Compare the location information
    if (country !== expectedCountry || region !== expectedRegion) {
      console.log(
        chalk.red("The current IP indicates you might be using a VPN."),
      );
      process.exit(1); // Exit the process if the IP location does not match the expected location
    }

    console.log(
      chalk.green(
        "The current IP location matches the expected location. You are not using a VPN.",
      ),
    );
  } catch (error) {
    console.error(
      chalk.red("An error occurred while fetching the IP address:"),
      error,
    );
  }
};

// Run the function
verifyNoVPNUsage();
