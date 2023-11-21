const selectFile = (event, setImage, setFormFields, img, imgName) => {
  if (event.target.files.length > 0) {
    setImage(() => URL.createObjectURL(event.target.files[0]));
    setFormFields((prevState) => ({
      ...prevState,
      imgName: event.target.files[0].name,
    }));
  } else {
    setImage(img);
    setFormFields((prevState) => ({ ...prevState, imgName: imgName }));
  }
};
export default selectFile;
