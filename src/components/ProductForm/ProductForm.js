import React from "react";
import { MdOutlineOpenInBrowser } from "react-icons/md";
const ProductForm = ({
  handleSubmit,
  handleFormChange,
  formRef,
  formFields,
  onSelectedFile,
  serverResponse,
  image,
  error,
  data,
  filePicker,
  pickFile,
}) => {
  return (
    <div>
      <p className="add_product_form_title">Completați cîmpurile:</p>
      <div className="add_product_container">
        <form
          onSubmit={handleSubmit}
          ref={formRef}
          className="add_product_form"
        >
          <label className={error.name === false ? "hidden" : "error"}>
            Introduceți numele produsului:
          </label>
          <label className="input_product_label">
            Denumirea produsului:
            <input
              type="text"
              name="product_name"
              id="add_product_name"
              className="add_product_input"
              value={formFields.product_name}
              onChange={handleFormChange}
            />
          </label>
          <label className="select_product_label">
            Categorie:
            <select
              name="categorie"
              id="categoryId"
              className="add_product_select"
              value={formFields.categorie}
              onChange={handleFormChange}
            >
              {data &&
                data?.categories?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.categoryName}
                  </option>
                ))}
            </select>
          </label>
          <label className="select_product_label">
            Subcategorie:
            <select
              name="subcategorie"
              id="subcategoryId"
              className="add_product_select"
              value={formFields.subcategorie}
              onChange={handleFormChange}
            >
              {data &&
                data?.subcategories?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.subcategoryName}
                  </option>
                ))}
            </select>
          </label>
          <label className="select_product_label">
            Producator:
            <select
              name="provider"
              id="providerId"
              className="add_product_select"
              value={formFields.provider}
              onChange={handleFormChange}
            >
              {data &&
                data?.providers?.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item["providerName"]}
                  </option>
                ))}
            </select>
          </label>
          <label className="select_product_label">
            Unitate:
            <select
              name="unity"
              id="unityId"
              className="add_product_select"
              value={formFields.unity}
              onChange={handleFormChange}
            >
              {data &&
                data?.unities?.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
            </select>
          </label>
          <label className={error.description === false ? "hidden" : "error"}>
            Introduceți descrierea
          </label>
          <label className="textarea_product_label">
            <label>Desriere:</label>
            <textarea
              name="product_description"
              id="productdescriptonID"
              cols="30"
              rows="10"
              value={formFields.product_description}
              onChange={handleFormChange}
            ></textarea>
          </label>
          <label className={error.file === false ? "hidden" : "error"}>
            Alegeți imaginea
          </label>
          <label className={error.fileName === false ? "hidden" : "error"}>
            Introduceți numele imaginii
          </label>
          <label className="img_label">
            Alegeți imaginea:
            <button onClick={pickFile} className="img_browse_button">
              <MdOutlineOpenInBrowser className="img_browse" />
            </button>
            <input
              type="text"
              name="imgName"
              id="add_product_name"
              className="img_name_input"
              // value={imgName}
              // onChange={(event) => {
              //   setImgName(event.target.value);}}
              value={formFields.imgName}
              onChange={handleFormChange}
            />
            <input
              className="hidden"
              name="image"
              type="file"
              ref={filePicker}
              accept="image/*,.png,.jpg,.jpeg,.web"
              onChange={onSelectedFile}
            ></input>
          </label>
          <label className={"error"}>{serverResponse}</label>
          <button type="submit" className="submit_product_buton">
            Submit
          </button>
        </form>
        <img
          src={image}
          alt="img/products/bomboane1.jpg"
          className="product_add_img"
        />
      </div>
    </div>
  );
};

export default ProductForm;
