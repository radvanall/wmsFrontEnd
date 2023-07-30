import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import CheckBox from "../CheckBox/CheckBox";
import BasicInput from "../BasicInput/BasicInput";
import BasicButton from "../BasicButton/BasicButton";
import Range from "../Range/Range";
import { useDispatch, useSelector } from "react-redux";
import {
  setRangeValues,
  resetRangeValues,
  setInputValues,
  resetInputValues,
  setDisplayedValues,
  resetDisplayedValues,
  resetStatus,
  changeStatus,
  resetCheckboxStates,
  setIsAllChecked,
  resetIsAllChecked,
  setFilterCriterias,
  resetFilterCriterias,
  handleCheckboxChange,
} from "../../toolkitRedux/stockFilterSlice";

import "./StocksFilterModal.css";
const StocksFilterModal = ({
  active,
  handleModal,
  data,
  resetData,
  filterStocks,
}) => {
  const dispatch = useDispatch();
  const rangeValues = useSelector(
    (state) => state.stockFilterSlice.rangeValues
  );
  const displayedValues = useSelector(
    (state) => state.stockFilterSlice.displayedValues
  );
  const inputValues = useSelector(
    (state) => state.stockFilterSlice.inputValues
  );
  const status = useSelector((state) => state.stockFilterSlice.status);
  const checkboxStates = useSelector(
    (state) => state.stockFilterSlice.checkboxStates
  );
  const isAllChecked = useSelector(
    (state) => state.stockFilterSlice.isAllChecked
  );
  const filterCriterias = useSelector(
    (state) => state.stockFilterSlice.filterCriterias
  );
  const categoryNameIds = [
    "category-all",
    "product-all",
    "subcategory-all",
    "provider-all",
  ];
  const handleRangeChange = (e) => {
    const id = e.target.id;
    const value = e.target.value;
    dispatch(setRangeValues({ id, value }));
  };

  useEffect(() => {
    if (data) {
      dispatch(resetCheckboxStates(data));
      dispatch(
        resetDisplayedValues({
          provider: data.filterProviderDTOList,
          category: data.filterCategoryDTOS,
          subcategory: data.filterSubcategoryDTOS,
          product: data.filterProductDTOS,
        })
      );
      dispatch(
        resetRangeValues({
          maxBuyingPrice: data.maxBuyingPrice,
          minBuyingPrice: 0,
          maxSellingPrice: data.maxSellingPrice,
          minSellingPrice: 0,
          maxQuantity: data.maxQuantity,
          minQuantity: 0,
        })
      );
    }
  }, [data]);
  const resetAllCheckboxes = () => {
    dispatch(resetCheckboxStates(data));
  };
  const getDataKey = (attribute) => {
    const dataKey =
      attribute === "product"
        ? "filterProductDTOS"
        : attribute === "provider"
        ? "filterProviderDTOList"
        : attribute === "category"
        ? "filterCategoryDTOS"
        : "filterSubcategoryDTOS";
    return dataKey;
  };
  const resetSerachCriteria = (attribute) => {
    const dataKey = getDataKey(attribute);
    console.log(attribute);
    console.log("data[key]:", data[dataKey]);
    dispatch(setInputValues({ attribute, value: "" }));
    dispatch(setDisplayedValues({ attribute, value: data[dataKey] }));
  };
  const handleChange = (e) => {
    dispatch(
      handleCheckboxChange({
        attribute: e.target.getAttribute("data-custom-attribute"),
        checked: e.target.checked,
        id: e.target.value,
        currentCategoryName: e.target.id,
        data,
      })
    );
  };
  const handleInputChange = (e, categoryName) => {
    dispatch(setIsAllChecked({ attribute: categoryName, checked: false }));
    const dataKey = getDataKey(categoryName);
    const newValues = data[dataKey].filter(
      (item) =>
        item[`${categoryName}Name`]
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        (checkboxStates &&
          checkboxStates[categoryName]?.find((el) => el.id === item.id)
            ?.checked)
    );

    dispatch(setDisplayedValues({ attribute: categoryName, value: newValues }));
    dispatch(
      setInputValues({ attribute: categoryName, value: e.target.value })
    );
  };
  const handleStatusChange = (e) => {
    dispatch(
      changeStatus({ value: e.target.value, checked: e.target.checked })
    );
  };
  const getCriteriasIds = (criteria) => {
    return checkboxStates[criteria]
      .filter((item) => item.checked)
      .map((item) => item.id);
  };
  const handleFilter = () => {
    const checkedStatus = Object.keys(status).filter((item) => status[item]);
    console.log("chekedStatus:", checkedStatus);
    const currentfilterCriterias = {
      providers: getCriteriasIds("provider"),
      categories: getCriteriasIds("category"),
      subcategories: getCriteriasIds("subcategory"),
      products: getCriteriasIds("product"),
      status: checkedStatus,
      maxBuyingPrice: rangeValues.maxBuyingPrice,
      minBuyingPrice: rangeValues.minBuyingPrice,
      maxSellingPrice: rangeValues.maxSellingPrice,
      minSellingPrice: rangeValues.minSellingPrice,
      maxQuantity: rangeValues.maxQuantity,
      minQuantity: rangeValues.minQuantity,
    };
    dispatch(setFilterCriterias());
    filterStocks(currentfilterCriterias);
  };
  const resetAllCriterias = () => {
    dispatch(resetInputValues());
    resetAllCheckboxes();
    dispatch(
      resetDisplayedValues({
        provider: data.filterProviderDTOList,
        category: data.filterCategoryDTOS,
        subcategory: data.filterSubcategoryDTOS,
        product: data.filterProductDTOS,
      })
    );
    dispatch(
      resetRangeValues({
        maxBuyingPrice: data.maxBuyingPrice,
        minBuyingPrice: 0,
        maxSellingPrice: data.maxSellingPrice,
        minSellingPrice: 0,
        maxQuantity: data.maxQuantity,
        minQuantity: 0,
      })
    );
    dispatch(resetIsAllChecked);
    dispatch(resetStatus());
  };
  const handleCloseModal = () => {
    if (!filterCriterias) resetAllCriterias();
    handleModal();
  };
  const handleReset = () => {
    resetAllCriterias();
    resetData(0);
    dispatch(resetFilterCriterias());
    dispatch(resetIsAllChecked());
  };
  return (
    <Modal active={active}>
      <CloseModal handleCloseModal={handleCloseModal} />
      {data && (
        <>
          <div className="checkbox__field__wrapper">
            <div className="filter__criteria__type">
              <BasicInput
                type="text"
                placeholder="Căutați furnizorul"
                value={inputValues.provider}
                handleChange={(e) => handleInputChange(e, "provider")}
              />
              <CheckBox
                id={"provider" + "-all"}
                value="all"
                name="provider_all"
                label="Toți furnizorii"
                attribute="provider"
                checked={isAllChecked.provider}
                handleChange={handleChange}
              />
              <div className="options__wrapper">
                {displayedValues.provider?.map((provider) => (
                  <CheckBox
                    id={"provider" + provider.id}
                    key={"provider" + provider.id}
                    value={provider.id}
                    name={provider.providerName}
                    label={provider.providerName}
                    attribute="provider"
                    checked={
                      checkboxStates?.provider?.find(
                        (item) => item.id === provider.id
                      )?.checked || false
                    }
                    handleChange={handleChange}
                  />
                ))}
              </div>
            </div>
            <div className="filter__criteria__type">
              <BasicInput
                type="text"
                placeholder="Căutați categoria"
                value={inputValues.category}
                handleChange={(e) => handleInputChange(e, "category")}
              />
              <CheckBox
                id={"category" + "-all"}
                value="all"
                name="cateogry_all"
                label="Toate categoriile"
                attribute="category"
                checked={isAllChecked.category}
                handleChange={handleChange}
              />
              <div className="options__wrapper">
                {displayedValues.category?.map((category) => (
                  <CheckBox
                    id={"category" + category.id}
                    key={"category" + category.id}
                    value={category.id}
                    name={category.categoryName}
                    label={category.categoryName}
                    attribute="category"
                    checked={
                      checkboxStates?.category?.find(
                        (item) => item.id === category.id
                      )?.checked || false
                    }
                    handleChange={handleChange}
                  />
                ))}
              </div>
            </div>
            <div className="filter__criteria__type">
              <BasicInput
                type="text"
                placeholder="Căutați subcategoria"
                value={inputValues.subcategory}
                handleChange={(e) => handleInputChange(e, "subcategory")}
              />
              <CheckBox
                id={"subcategory" + "-all"}
                value="all"
                name="subcategory_all"
                label="Toate subcategoriile"
                attribute="subcategory"
                checked={isAllChecked.subcategory}
                handleChange={handleChange}
              />
              <div className="options__wrapper">
                {displayedValues.subcategory?.map((subcategory) => (
                  <CheckBox
                    id={"subcategory" + subcategory.id}
                    key={"subcategory" + subcategory.id}
                    value={subcategory.id}
                    name={subcategory.subcategoryName}
                    label={subcategory.subcategoryName}
                    attribute="subcategory"
                    checked={
                      checkboxStates?.subcategory?.find(
                        (item) => item.id === subcategory.id
                      )?.checked || false
                    }
                    handleChange={handleChange}
                  />
                ))}
              </div>
            </div>
            <div className="filter__criteria__type">
              <BasicInput
                type="text"
                placeholder="Căutați produsul"
                value={inputValues.product}
                handleChange={(e) => handleInputChange(e, "product")}
              />
              <CheckBox
                id={"product" + "-all"}
                value="all"
                name="product_all"
                label="Toate produsele"
                attribute="product"
                checked={isAllChecked.product}
                handleChange={handleChange}
              />
              <div className="options__wrapper">
                {displayedValues.product?.map((product) => (
                  <CheckBox
                    id={"product" + product.id}
                    key={"product" + product.id}
                    value={product.id}
                    name={product.productName}
                    label={product.productName}
                    attribute="product"
                    checked={
                      checkboxStates?.product?.find(
                        (item) => item.id === product.id
                      )?.checked || false
                    }
                    handleChange={handleChange}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="range__state__wrapper">
            <div className="state__wrapper">
              <h2>Selectați starea</h2>
              <CheckBox
                id="allStates"
                value="allStates"
                name="allStates"
                label="Toate stările"
                padding="5px"
                borderRadius="5px"
                width="150px"
                checked={status.allStates}
                handleChange={handleStatusChange}
              />
              <CheckBox
                id="forSale"
                value="forSale"
                name="forSale"
                label="Pentru vânzare"
                padding="5px"
                backgroundColor="#f8e4b4"
                borderRadius="5px"
                width="150px"
                checked={status.forSale}
                handleChange={handleStatusChange}
              />
              <CheckBox
                id="inSale"
                value="inSale"
                name="inSale"
                label="În vânzare"
                padding="5px"
                backgroundColor="#b4f8f5"
                borderRadius="5px"
                width="150px"
                checked={status.inSale}
                handleChange={handleStatusChange}
              />
              <CheckBox
                id="validated"
                value="validated"
                name="validated"
                label="Validat"
                padding="5px"
                backgroundColor="#b4f8c8"
                borderRadius="5px"
                width="150px"
                checked={status.validated}
                handleChange={handleStatusChange}
              />
              <CheckBox
                id="unvalidated"
                value="unvalidated"
                name="unvalidated"
                label="Nevalidat"
                padding="5px"
                backgroundColor="#ffaebc"
                borderRadius="5px"
                width="150px"
                checked={status.unvalidated}
                handleChange={handleStatusChange}
              />
            </div>
            <div className="range__max__wrapper">
              <div className="filter__range__wrapper">
                <label>Alegeți prețul de cumpărare maxim</label>
                <Range
                  id="maxBuyingPrice"
                  name="maxBuyingPrice"
                  value={rangeValues.maxBuyingPrice}
                  max={data.maxBuyingPrice}
                  unit="lei"
                  labelWidth="25%"
                  rangeWidth="75%"
                  handleChange={handleRangeChange}
                />
              </div>
              <div className="filter__range__wrapper">
                <label>Alegeți prețul de vânzare maxim</label>
                <Range
                  id="maxSellingPrice"
                  name="maxSellingPrice"
                  value={rangeValues.maxSellingPrice}
                  max={data.maxSellingPrice}
                  unit="lei"
                  labelWidth="25%"
                  rangeWidth="75%"
                  handleChange={handleRangeChange}
                />
              </div>
              <div className="filter__range__wrapper">
                <label>Alegeți cantitatea maximă</label>
                <Range
                  id="maxQuantity"
                  name="maxQuantity"
                  value={rangeValues.maxQuantity}
                  max={data.maxQuantity}
                  unit="un."
                  labelWidth="25%"
                  rangeWidth="75%"
                  handleChange={handleRangeChange}
                />
              </div>
            </div>
            <div className="range__min__wrapper">
              <div className="filter__range__wrapper">
                <label>Alegeți prețul de cumpărare minim</label>
                <Range
                  id="minBuyingPrice"
                  name="minBuyingPrice"
                  value={rangeValues.minBuyingPrice}
                  max={data.maxBuyingPrice}
                  unit="lei"
                  labelWidth="25%"
                  rangeWidth="75%"
                  handleChange={handleRangeChange}
                />
              </div>
              <div className="filter__range__wrapper">
                <label>Alegeți prețul de vânzare minim</label>
                <Range
                  id="minSellingPrice"
                  name="minSellingPrice"
                  value={rangeValues.minSellingPrice}
                  max={data.maxSellingPrice}
                  unit="lei"
                  labelWidth="25%"
                  rangeWidth="75%"
                  handleChange={handleRangeChange}
                />
              </div>
              <div className="filter__range__wrapper">
                <label>Alegeți cantitatea minimă</label>
                <Range
                  id="minQuantity"
                  name="minQuantity"
                  value={rangeValues.minQuantity}
                  max={data.maxQuantity}
                  unit="un."
                  labelWidth="25%"
                  rangeWidth="75%"
                  handleChange={handleRangeChange}
                />
              </div>
            </div>
          </div>
          <div className="button__wrapper">
            <BasicButton handleClick={handleFilter} text="Filtrează" />
            <BasicButton handleClick={handleReset} text="Resetează" />
          </div>
        </>
      )}
    </Modal>
  );
};

export default StocksFilterModal;
