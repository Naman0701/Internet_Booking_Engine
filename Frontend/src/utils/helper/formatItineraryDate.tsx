export const formatItineraryDate = (date: any) => {
  const regex = /^[a-zA-Z]+\s\d{1,2}(st|nd|rd|th)\s[a-zA-Z]{3}$/;
  if (regex.test(date)) {
    return date;
  }
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    weekday: "long",
    day: "numeric",
    month: "short",
  });
  const formattedDateArray = formattedDate.split(" ");
  return `${formattedDateArray[0]} ${formattedDateArray[2]} ${formattedDateArray[1]}`;
};
