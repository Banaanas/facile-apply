// Define a list of enabled country codes
export const enabledCountries: Array<EnabledCountry> = [
  { name: "Australia", code: "AU" },
  { name: "Austria", code: "AT" },
  { name: "Belgium", code: "BE" },
  { name: "Canada", code: "CA" },
  { name: "Denmark", code: "DK" },
  { name: "Finland", code: "FI" },
  { name: "France", code: "FR" },
  { name: "Germany", code: "DE" },
  { name: "Iceland", code: "IS" },
  { name: "Ireland", code: "IE" },
  { name: "Italy", code: "IT" },
  { name: "Japan", code: "JP" },
  { name: "Luxembourg", code: "LU" },
  { name: "Netherlands", code: "NL" },
  { name: "New Zealand", code: "NZ" },
  { name: "Norway", code: "NO" },
  { name: "Singapore", code: "SG" },
  { name: "Spain", code: "ES" },
  { name: "Sweden", code: "SE" },
  { name: "Switzerland", code: "CH" },
  { name: "United Kingdom", code: "GB" },
  { name: "United States", code: "US" },
  { name: "South Korea", code: "KR" },
  { name: "Israel", code: "IL" },
  { name: "Slovenia", code: "SI" },
  { name: "Estonia", code: "EE" },
  { name: "Czech Republic", code: "CZ" },
  { name: "Greece", code: "GR" },
  { name: "Portugal", code: "PT" },
  { name: "Slovakia", code: "SK" },
  { name: "Poland", code: "PL" },
  { name: "Hungary", code: "HU" },
  { name: "Latvia", code: "LV" },
  { name: "Lithuania", code: "LT" },
  { name: "Croatia", code: "HR" },
  { name: "Cyprus", code: "CY" },
  { name: "Malta", code: "MT" },
  // Additional countries with high income or HDI
  { name: "United Arab Emirates", code: "AE" },
  { name: "Brunei", code: "BN" },
  { name: "Qatar", code: "QA" },
  { name: "Saudi Arabia", code: "SA" },
  { name: "Bahrain", code: "BH" },
  { name: "Oman", code: "OM" },
  { name: "Kuwait", code: "KW" },
  // Regions with high development standards
  { name: "Hong Kong", code: "HK" }, // Special Administrative Region of China
  { name: "Macau", code: "MO" }, // Special Administrative Region of China
  // European countries outside the EU with high HDI
  { name: "Liechtenstein", code: "LI" },
  { name: "Monaco", code: "MC" },
  { name: "Andorra", code: "AD" },
  { name: "San Marino", code: "SM" },
  // Other notable high-income territories
  { name: "Bermuda", code: "BM" },
  { name: "Cayman Islands", code: "KY" },
  { name: "Greenland", code: "GL" },
  { name: "Faeroe Islands", code: "FO" },
];

interface EnabledCountry {
  name: string;
  code: string;
}
