export const extractCountryFromCompanyProfileResponse = (
  responseData: LinkedInCompanyApiResponse,
): string | undefined => {
  try {
    const { elements } =
      responseData.data.organizationDashCompaniesByUniversalName;
    if (elements.length === 0) {
      console.error("No elements found in the response data.");
      return undefined;
    }
    // Ensure that headquarter and its address are not null
    if (!elements[0].headquarter || !elements[0].headquarter.address) {
      console.error("Headquarter or address is null.");
      return undefined;
    }
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
