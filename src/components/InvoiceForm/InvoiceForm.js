import React from "react";
import "./InvoiceForm.css";
import CustomSelect from "../CustomSelect/CustomSelect";
const InvoiceForm = ({
  data,
  provider,
  formFields,
  image,
  selected,
  opened,
  setOpened,
  setFormFields,
  handleFormChange,
  getPositions,
  positions,
  handleProviderChange,
  handleSelect,
  addPosition,
  modifyPosition,
  modifyButtons,
  cancelModify,
  invoiceModified,
  isValid,
}) => {
  return (
    <div className="invoice_form_wrapper">
      <p className="input_form_header">Selectați furnizorul:</p>
      <div className="select__provider__wrapper">
        <select
          name="provider"
          className="select__provider"
          value={provider}
          onChange={handleProviderChange}
        >
          <option value="default">-- select an option --</option>
          {data &&
            data.map((item) => (
              <option key={item.id} value={item.id}>
                {item.providerName}
              </option>
            ))}
        </select>
        {/* <button onClick={getPositions}>Select</button> */}
      </div>
      {positions.length > 0 ? (
        <div>
          <p className="input_form_header">Selectați produsul:</p>
          {!isValid.product && (
            <p className="error__message">Alegeți produsul</p>
          )}
          <CustomSelect
            positions={positions}
            setFormFields={setFormFields}
            handleSelect={handleSelect}
            image={image}
            selected={selected}
            setOpened={setOpened}
            opened={opened}
            readOnly={true}
          />

          <div className="input__wrapper">
            <p className="input_form_header">Introduceți cantitatea:</p>
            {!isValid.quantity && (
              <p className="error__message">Introduceți cantitatea</p>
            )}
            <div className="input__wrapper_2">
              <input
                type="number"
                name="stockQuantity"
                min={0}
                className="invoice_form_input"
                value={formFields.stockQuantity}
                onChange={handleFormChange}
              />
              <p>buc.</p>
            </div>

            <div className="input__wrapper">
              <p className="input_form_header">
                Introduceți prețul de cumpărare:
              </p>
              {!isValid.price && (
                <p className="error__message">
                  Introduceți prețul de cumpărare
                </p>
              )}
              <div className="input__wrapper_2">
                <input
                  type="number"
                  name="buyingPrice"
                  min={0}
                  className="invoice_form_input"
                  value={formFields.buyingPrice}
                  onChange={handleFormChange}
                />
                <p>lei</p>
              </div>
            </div>
            <div className="input__wrapper">
              <p className="input_form_header">
                Introduceți prețul de vînzare:
              </p>
              <div className="input__wrapper_2">
                <input
                  type="number"
                  name="sellingPrice"
                  min={0}
                  className="invoice_form_input"
                  value={formFields.sellingPrice}
                  onChange={handleFormChange}
                />
                <p>lei</p>
              </div>
            </div>
            {/* <select
          name="product"
          className="select__product"
          value={formFields.product}
          onChange={handleFormChange}
        >
          {positions &&
            positions.map((item) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
        </select> */}
          </div>
          {modifyButtons ? (
            <div>
              <button onClick={modifyPosition} className="invoice__button">
                Modifică
              </button>
              <button onClick={cancelModify} className="invoice__button">
                Cancel
              </button>
            </div>
          ) : (
            <div>
              {invoiceModified ? (
                <h2 className="invoice__modified__message">
                  Datele au fost modificate cu succes
                </h2>
              ) : (
                <button onClick={addPosition} className="invoice__button">
                  Adaugă
                </button>
              )}
            </div>
          )}
        </div>
      ) : (
        <p>Selectați furnizorul</p>
      )}
    </div>
  );
};

export default InvoiceForm;
