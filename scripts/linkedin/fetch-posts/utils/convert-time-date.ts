export const convertRelativeTimeToDate = (relativeTimeString: string): Date => {
  // Get the current date and time
  const currentDate = new Date();

  // Extract the number and the time unit (m, h, d) from the string
  const match = relativeTimeString.match(/(\d+)(m|h|d|w)/);

  if (!match) {
    console.error(`Invalid Date format: ${relativeTimeString}`);
    return null;
  }

  const [, amount, unit] = match;
  const amountInt = parseInt(amount, 10);

  switch (unit) {
    case "m": // Minutes
      currentDate.setMinutes(currentDate.getMinutes() - amountInt);
      break;
    case "h": // Hours
      currentDate.setHours(currentDate.getHours() - amountInt);
      break;
    case "d": // Days
      currentDate.setDate(currentDate.getDate() - amountInt);
      break;
    case "w": // Weeks
      currentDate.setDate(currentDate.getDate() - amountInt * 7); // Convert weeks to days
      break;
    default:
      console.error("Unsupported time unit");
      return null;
  }

  return currentDate;
};
