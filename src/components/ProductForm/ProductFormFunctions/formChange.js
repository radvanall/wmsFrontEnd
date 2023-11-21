const formChange = (event, setFormFields) => {
  const name = event.target.name;
  const value = event.target.value;
  setFormFields((prevState) => ({ ...prevState, [name]: value }));
};
export default formChange;
