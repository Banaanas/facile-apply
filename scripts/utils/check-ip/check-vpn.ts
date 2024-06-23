import axios from "axios";
import colors from "colors";

/**
 * This script is used to verify if a proxy is correctly being used by comparing
 * the local IP address, the IP address obtained through the proxy, and a hardcoded VPN IP.
 *
 * Note: We are currently using ProtonVPN. When we connect, we get our VPN server IP
 * through the ProtonVPN GUI.
 */

const vpnIp = "149.34.244.181"; // Replace with your actual VPN IP address

export const verifyVPNUsage = async () => {
  const ipApi = "https://httpbin.org/ip";

  // Fetch the local IP address
  const localIpResponse = await axios.get(ipApi);
  const localIp = localIpResponse.data.origin;

  // Compare the IP addresses
  if (localIp !== vpnIp) {
    console.log(
      colors.red("The proxy IP does not match the VPN IP. Aborting..."),
    );
    console.log(
      colors.magenta.italic(
        "The proxy IP does not match the VPN IP. Possible reasons:\n" +
          "- VPN app is not running.\n" +
          "- VPN is running, but the VPN IP variable is different from the current IP.\n" +
          "Please use the VPN GUI to get the current IP, then update the code.",
      ),
    );
    process.exit(1); // Exit the process if the IPs do not match the VPN IP
  }
  console.log(
    colors.green(
      "The proxy IP is the same as the VPN IP. The proxy is correctly set up.",
    ),
  );
};
