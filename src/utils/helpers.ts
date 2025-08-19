import municipalities from "../taxonomy/municipalities.json";
import regions from "../taxonomy/regions.json";

export const formatSwedishDate = (dateString: string): string => {
  const date = new Date(dateString);

  // Using Intl.DateTimeFormat for Swedish locale
  const dayMonth = date.toLocaleDateString("sv-SE", {
    day: "numeric",
    month: "long",
  });

  const time = date.toLocaleTimeString("sv-SE", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return `${dayMonth}, kl. ${time}`;
};

/**
 * Maps a code to its display name based on taxonomy type.
 * @param code - The code or value to look up.
 * @param type - The taxonomy type: "municipality" | "region"
 * @returns The display name or undefined.
 */
/**
 * Maps a code to its display name based on taxonomy type.
 * @param code - The code or value to look up.
 * @param type - The taxonomy type: "municipality" | "region"
 * @returns The display name or undefined.
 */
export function taxonomyMap(
  code: string,
  type: "municipality" | "region"
): string | undefined {
  let arr;
  switch (type) {
    case "municipality":
      arr = municipalities;
      break;
    case "region":
      arr = regions;
      break;
    default:
      return undefined;
  }
  const found = arr.find((item) => item.key === code || item.value === code);
  return found ? found.value : undefined;
}
