export const buildSearchIdentifier = (
  domain: string,
  query: string,
  location?: string,
  remoteFilter?: boolean,
): string => {
  const locationPart = location ? `_loc_${location.replace(/\s+/g, "_")}` : "";
  const remotePart = remoteFilter ? "_remote" : "";
  return `${domain}_${query}${locationPart}${remotePart}`;
};
