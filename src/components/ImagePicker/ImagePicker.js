import React, { useRef } from "react";
import { MdOutlineOpenInBrowser } from "react-icons/md";

const ImagePicker = ({ imgName, onSelectedFile, handleImgNameChange }) => {
  const filePicker = useRef(null);
  const pickFile = (event) => {
    event.preventDefault();
    filePicker.current.click();
  };
  return (
    <>
      <button onClick={pickFile} className="img_browse_button">
        <MdOutlineOpenInBrowser className="img_browse" />
      </button>
      <input
        type="text"
        name="imgName"
        id="add_product_name"
        className="img_name_input"
        style={{ paddingLeft: "5px" }}
        value={imgName}
        onChange={handleImgNameChange}
      />
      <input
        className="hidden"
        name="image"
        type="file"
        ref={filePicker}
        accept="image/*,.png,.jpg,.jpeg,.web"
        onChange={onSelectedFile}
      ></input>
    </>
  );
};

export default ImagePicker;
