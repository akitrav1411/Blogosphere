const getFormattedDate = (dateString) => {
  const inputDate = new Date(dateString);
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = inputDate.toLocaleDateString("en-US", options);
  return formattedDate;
};
export { getFormattedDate };
