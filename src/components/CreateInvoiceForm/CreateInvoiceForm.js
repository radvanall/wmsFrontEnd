import React from "react";
import Modal from "../Modal/Modal";
import { CgCloseR } from "react-icons/cg";
import InvoiceForm from "../InvoiceForm/InvoiceForm";
import InvoiceTable from "../InvoiceTable/InvoiceTable";
import AlertMessage from "../AlertMessage/AlertMessage";
import LoadingComponent from "../LoadingComponent/LoadingComponent";
import CloseModal from "../CloseModal/CloseModal";

const CreateInvoiceForm = ({
  active,
  data,
  provider,
  formFields,
  image,
  selected,
  opened,
  positions,
  modifyButtons,
  invoiceModified,
  isValid,
  invoice,
  invoiceId,
  isOpenMessage,
  closeMessage,
  messageLoading,
  messageError,
  savedMessage,
  isSavedMessage,
  fillFormMessage,
  setOpened,
  setFormFields,
  handleFormChange,
  getPositions,
  handleProviderChange,
  handleSelect,
  addPosition,
  modifyPosition,
  cancelModify,
  handleDelete,
  handleEdit,
  handleChange,
  toggleMessage,
  closeForm,
  cancelCloseForm,
  handleCloseForm,
  handleSaveData,
  setFillFormMessage,
  saveData,
}) => {
  return (
    <div>
      <Modal active={active}>
        {/* <CgCloseR onClick={handleCloseForm} /> */}
        <CloseModal handleCloseModal={handleCloseForm} />
        {data ? (
          <div className="create__invoice">
            <div className="invoice__form__table__wrapper">
              {data && (
                <InvoiceForm
                  data={data}
                  provider={provider}
                  formFields={formFields}
                  image={image}
                  selected={selected}
                  opened={opened}
                  setOpened={setOpened}
                  setFormFields={setFormFields}
                  handleFormChange={handleFormChange}
                  getPositions={getPositions}
                  positions={positions}
                  handleProviderChange={handleProviderChange}
                  handleSelect={handleSelect}
                  addPosition={addPosition}
                  modifyPosition={modifyPosition}
                  modifyButtons={modifyButtons}
                  invoiceModified={invoiceModified}
                  cancelModify={cancelModify}
                  isValid={isValid}
                />
              )}
              <InvoiceTable
                data={invoice}
                header={"positii"}
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                invoiceModified={invoiceModified}
                invoiceId={invoiceId}
              />
            </div>
            <AlertMessage
              message="Dataele vor fi pierdute"
              active={isOpenMessage}
            >
              <button onClick={handleChange} className="invoice__button">
                Ok
              </button>
              <button onClick={toggleMessage} className="invoice__button">
                Anulează
              </button>
            </AlertMessage>
            <AlertMessage
              message="Dataele vor fi pierdute"
              active={closeMessage}
            >
              <button onClick={closeForm} className="invoice__button">
                Ok
              </button>
              <button onClick={cancelCloseForm} className="invoice__button">
                Anulează
              </button>
            </AlertMessage>
            <AlertMessage
              message={
                messageLoading
                  ? null
                  : messageError
                  ? messageError
                  : savedMessage
              }
              active={isSavedMessage}
            >
              {messageLoading ? (
                <LoadingComponent />
              ) : (
                <button onClick={handleSaveData} className="invoice__button">
                  Ok
                </button>
              )}
            </AlertMessage>

            <AlertMessage message="Introduceți datele" active={fillFormMessage}>
              <button
                onClick={() => {
                  setFillFormMessage(false);
                }}
                className="invoice__button"
              >
                Ok
              </button>
            </AlertMessage>
            <button onClick={saveData} className="invoice__button save__button">
              Salveaza
            </button>
          </div>
        ) : (
          <h2>Probleme cu conexiunea...</h2>
        )}
      </Modal>
    </div>
  );
};

export default CreateInvoiceForm;
