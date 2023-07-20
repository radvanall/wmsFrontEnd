const getFormatedDate = (date, locale) => {
  const options = { day: "numeric", month: "long", year: "numeric" };
  return new Date(date).toLocaleDateString(locale, options).toUpperCase();
};
export default getFormatedDate;
