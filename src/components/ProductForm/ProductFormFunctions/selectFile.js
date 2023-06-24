const selectFile = (event, setImage, setFormFields, img, imgName) => {
  console.log(event.target.files);
  if (event.target.files.length > 0) {
    setImage(() => URL.createObjectURL(event.target.files[0]));
    // setImgName(event.target.files[0].name);
    setFormFields((prevState) => ({
      ...prevState,
      imgName: event.target.files[0].name,
      //selectedImage: event.target.files[0],
    }));
  } else {
    setImage(img);
    // setImgName("");
    setFormFields((prevState) => ({ ...prevState, imgName: imgName }));
  }
};
export default selectFile;
