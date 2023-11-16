import React, { useState } from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import BasicButton from "../BasicButton/BasicButton";
import CustomSelect from "../CustomSelect/CustomSelect";
import usePostData from "../../hooks/usePostData";

const CardModal = ({
  address,
  clientAddress,
  refetch,
  invoiceId,
  active,
  handleCloseModal,
}) => {
  const {
    message,
    loading: postLoading,
    error: postError,
    resetMessage,
    postData,
  } = usePostData();
  const stateAddresses =
    address === "inStore"
      ? [
          { id: 1, name: "Pe loc" },
          { id: 2, name: clientAddress },
        ]
      : [
          { id: 1, name: "Pe loc" },
          { id: 3, name: address },
          { id: 2, name: clientAddress },
        ];
  const [addresses, setAddresses] = useState(stateAddresses);

  const [addressOpened, setAddressOpened] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState({
    id: 3,
    name: address === "inStore" ? "Pe loc" : address,
  });
  const [errors, setErrors] = useState(false);
  const handleAddressSelect = (e) => {
    const address = addresses.find(
      (address) => parseInt(address.id) === parseInt(e.target.id)
    );
    setSelectedAddress(address);
    setAddressOpened(false);
    setErrors(false);
  };
  const handleAddressChange = (e) => {
    setSelectedAddress({ id: 4, name: e.target.value });
    setErrors(false);
  };
  const sendAddress = async () => {
    if (selectedAddress.name.trim() === "") {
      console.log("error address");
      setErrors(true);
      return;
    }
    const newAddress =
      parseInt(selectedAddress.id) === 1 ? "inStore" : selectedAddress.name;

    const requestData = {
      newAddress: newAddress,
    };

    await postData(
      requestData,
      `http://localhost:8080/api/invoice/changeAddress/${invoiceId}`
    );
    refetch();
    setTimeout(() => {
      resetMessage();
    }, 2000);
    console.log(newAddress);
  };
  return (
    <Modal active={active}>
      <CloseModal handleCloseModal={handleCloseModal} />

      <label className="input__label">Introduceți adresa:</label>
      <CustomSelect
        positions={addresses}
        setOpened={() => setAddressOpened((prev) => !prev)}
        opened={addressOpened}
        selected={selectedAddress.name}
        handleSelect={handleAddressSelect}
        handleChange={handleAddressChange}
        zIndex={4}
      />
      {errors && <p style={{ color: "red" }}>Introduceți adresa</p>}
      {message && <p style={{ color: "red" }}>{message}</p>}
      <BasicButton text="Modifică" handleClick={sendAddress} />
    </Modal>
  );
};

export default CardModal;
