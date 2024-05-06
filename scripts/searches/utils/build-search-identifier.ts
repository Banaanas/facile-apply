export const buildSearchIdentifier = (
  location: string,
  keyword: string,
): string => {
  // Standardize keyword by replacing spaces with hyphens to ensure URL friendliness and adherence to identifier standards.
  const formattedKeyword = keyword.replace(/\s/g, "-");

  // Default format assumed to be suitable for Indeed or other platforms
  return `${location}-${formattedKeyword}`;
};
