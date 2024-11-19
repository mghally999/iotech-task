/**
 * Capitalizes the first letter of each word in the given string.
 * @param text - The input string to be formatted.
 * @returns A capitalized version of the input string.
 */
export const capitalize = (text: string): string => {
  if (!text) return ""; // Return an empty string if input is invalid
  return text
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};
