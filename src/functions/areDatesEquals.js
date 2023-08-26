const areDateEquals = (firstDateString, secondDateString) => {
  const firstDate = new Date(firstDateString.substring(0, 10));
  const secondDate = new Date(secondDateString.substring(0, 10));

  console.log(firstDate);
  console.log(secondDate);

  console.log(
    firstDate.getFullYear() === secondDate.getFullYear() &&
      firstDate.getMonth() === secondDate.getMonth() &&
      firstDate.getDate() === secondDate.getDate()
  );
  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
};
export default areDateEquals;
