export const extractCountryFromCompanyProfileResponse = (
  responseData: LinkedInCompanyApiResponse, // Update the type
): string | undefined => {
  try {
    // Adjust the path to match the company profile structure
    const { elements } =
      responseData.data.organizationDashCompaniesByUniversalName;
    if (elements.length === 0) {
      console.error("No elements found in the response data.");
      return undefined;
    }
    // Extract the country code from the address of the headquarter
    const { country } = elements[0].headquarter.address;
    return country; // This assumes country is the country code
  } catch (error) {
    console.error("Error processing response data:", error);

    return undefined;
  }
};

export interface LinkedInCompanyApiResponse {
  data: {
    organizationDashCompaniesByUniversalName: {
      elements: Array<{
        headquarter: {
          address: {
            country: string; // Assuming this is the country code
          };
        };
      }>;
    };
  };
}
