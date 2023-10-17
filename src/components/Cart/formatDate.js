export const formatdate = (date) => {
  const option = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  };
  const formattedDateTime = new Date(date).toLocaleString(undefined, option);
  return formattedDateTime;
};
