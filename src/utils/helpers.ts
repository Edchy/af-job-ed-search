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
