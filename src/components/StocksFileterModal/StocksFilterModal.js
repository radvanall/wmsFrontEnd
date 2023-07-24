import React, { useState } from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import CheckBox from "../CheckBox/CheckBox";
import BasicInput from "../BasicInput/BasicInput";
import Range from "../Range/Range";
import useFetch from "../../hooks/useFetch";
import "./StocksFilterModal.css";
const StocksFilterModal = ({ active, handleModal }) => {
  const [value, setValue] = useState(0);
  const handleRangeChange = (e) => {
    setValue(e.target.value);
  };
  const { data, loading, error, fetchData } = useFetch(
    "http://localhost:8080/api/stock/filterSettings"
  );
  return (
    <Modal active={active}>
      <CloseModal handleCloseModal={handleModal} />
      {/* <CheckBox id={1} name="test" label="thisCheckbox" />
      <Range
        id={2}
        name="range"
        label="Ragne"
        value={value}
        max={500}
        unit="lei"
        handleChange={handleRangeChange}
      /> */}
      {data && (
        <>
          <div className="checkbox__field__wrapper">
            <div className="filter__criteria__type">
              <BasicInput type="text" placeholder="Căutați furnizorul" />
              <div className="options__wrapper">
                {data.filterProviderDTOList?.map((provider) => (
                  <CheckBox
                    id={provider.id}
                    name={provider.providerName}
                    label={provider.providerName}
                  />
                ))}
              </div>
            </div>
            <div className="filter__criteria__type">
              <BasicInput type="text" placeholder="Căutați categoria" />
              <div className="options__wrapper">
                {data.filterCategoryDTOS?.map((category) => (
                  <CheckBox
                    id={category.id}
                    name={category.categoryName}
                    label={category.categoryName}
                  />
                ))}
              </div>
            </div>
            <div className="filter__criteria__type">
              <BasicInput type="text" placeholder="Căutați subcategoria" />
              <div className="options__wrapper">
                {data.filterSubcategoryDTOS?.map((subcategory) => (
                  <CheckBox
                    id={subcategory.id}
                    name={subcategory.subcategoryName}
                    label={subcategory.subcategoryName}
                  />
                ))}
              </div>
            </div>
            <div className="filter__criteria__type">
              <BasicInput type="text" placeholder="Căutați produsul" />
              <div className="options__wrapper">
                {data.filterProductDTOS?.map((product) => (
                  <CheckBox
                    id={product.id}
                    name={product.productName}
                    label={product.productName}
                  />
                ))}
              </div>
            </div>
          </div>
          <div></div>
        </>
      )}
    </Modal>
  );
};

export default StocksFilterModal;
