const areDateEquals = (firstDateString, secondDateString) => {
  const firstDate = new Date(firstDateString);
  const secondDate = new Date(secondDateString);

  return (
    firstDate.getFullYear() === secondDate.getFullYear() &&
    firstDate.getMonth() === secondDate.getMonth() &&
    firstDate.getDate() === secondDate.getDate()
  );
};
