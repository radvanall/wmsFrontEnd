const getMonthAndYear = (date, locale) => {
  const options = { month: "long", year: "numeric" };
  if (!date) return "--";
  return new Date(date).toLocaleDateString(locale, options).toUpperCase();
};
export default getMonthAndYear;
