import axios from "axios";
import chalk from "chalk";

/**
 * This script checks if the current IP address indicates the use of a VPN.
 * It fetches the IP address and its geographical information, and compares it with
 * the expected location (France, Rhône-Alpes).
 * Note: We are currently using ProtonVPN. When we connect, we get our VPN server IP
 * through the ProtonVPN GUI.
 */

const expectedCountry = "FR"; // Expected country code for France
const expectedRegion = "Auvergne-Rhône-Alpes"; // Expected region

const IP_API = "https://ipinfo.io";

const fetchIPAddressInfo = async () => {
  const response = await axios.get(IP_API);
  return response.data;
};

export const verifyVPNUsage = async () => {
  try {
    const { country, region } = await fetchIPAddressInfo();

    if (country === expectedCountry && region === expectedRegion) {
      console.log(
        chalk.red(
          "The current IP location matches the non-VPN location. It seems you are not using a VPN.",
        ),
      );
      console.log(
        chalk.italic(
          `Possible reasons:\n` +
            `- VPN app is not running.\n` +
            `- VPN is running, but the VPN IP location matches the non-VPN location.\n${"Please check the VPN settings and ensure it's connected to a server outside France, Rhône-Alpes."}`,
        ),
      );
      process.exit(1);
    }

    console.log(
      chalk.green(
        "The current IP location does not match the non-VPN location. The VPN is correctly set up.",
      ),
    );
  } catch (error) {
    console.log(chalk.red("An error occurred while fetching the IP address:"));
    console.error(error);
  }
};
