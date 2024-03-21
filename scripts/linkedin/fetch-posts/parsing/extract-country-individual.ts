export const extractCountryFromIndividualProfileResponse = (
  responseData: LinkedInIndividualApiResponse,
): string | undefined => {
  try {
    const { elements } = responseData.data.identityDashProfilesByMemberIdentity;
    if (elements.length === 0) {
      console.error("No elements found in the response data.");
      return undefined;
    }

    const geoLocation = elements[0]?.geoLocation?.geo;
    if (!geoLocation) {
      console.log("Geo location is undefined.");
      return undefined;
    }

    // Attempt to retrieve the country name in various forms
    return (
      geoLocation.country?.defaultLocalizedName ||
      geoLocation.defaultLocalizedNameWithoutCountryName ||
      geoLocation.defaultLocalizedName
    );
  } catch (error) {
    console.error("Error processing response data:", error);
    return undefined;
  }
};

// Updated interfaces to reflect potential new properties
export interface LinkedInIndividualApiResponse {
  data: {
    identityDashProfilesByMemberIdentity: IdentityDashProfilesByMemberIdentity;
  };
}

interface IdentityDashProfilesByMemberIdentity {
  elements: Element[];
}

interface Element {
  geoLocation?: GeoLocation;
}

interface GeoLocation {
  geo: Geo;
}

interface Geo {
  country?: Country; // Country can be optional
  defaultLocalizedNameWithoutCountryName?: string; // Additional possible field
  defaultLocalizedName?: string; // Additional possible field
}

interface Country {
  defaultLocalizedName: string;
}
