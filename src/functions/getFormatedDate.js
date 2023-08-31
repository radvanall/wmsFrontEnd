const getFormatedDate = (date, locale) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  if (!date) return "--";
  return new Date(date).toLocaleDateString(locale, options).toLowerCase();
};
export default getFormatedDate;
