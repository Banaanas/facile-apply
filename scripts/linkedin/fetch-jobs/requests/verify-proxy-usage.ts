import axios, { AxiosRequestConfig } from "axios";

export const verifyProxyUsage = async (axiosConfig: AxiosRequestConfig) => {
  const ipApi = "https://httpbin.org/ip";

  // Fetch the local IP address
  const localIpResponse = await axios.get(ipApi);
  const localIp = localIpResponse.data.origin;

  // Fetch the IP address using the proxy
  const proxyIpResponse = await axios.get(ipApi, axiosConfig);
  const proxyIp = proxyIpResponse.data.origin;

  // Compare the two IP addresses
  if (localIp === proxyIp) {
    console.error("The proxy IP is the same as the local IP. Aborting...");
    process.exit(1); // Exit the process if the IPs match
  } else {
    console.log(`Local IP: ${localIp}, Proxy IP: ${proxyIp}`);
  }
};
