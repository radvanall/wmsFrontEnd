import React, { useState, useEffect } from "react";
import Modal from "../Modal/Modal";
import CloseModal from "../CloseModal/CloseModal";
import CheckBox from "../CheckBox/CheckBox";
import BasicInput from "../BasicInput/BasicInput";
import Range from "../Range/Range";
import useFetch from "../../hooks/useFetch";
import "./StocksFilterModal.css";
const StocksFilterModal = ({ active, handleModal }) => {
  const [value, setValue] = useState(0);
  const [displaiedValues, setDisplayedValues] = useState({
    provider: [],
    category: [],
    subcategory: [],
    product: [],
  });
  const [checkboxStates, setCheckboxStates] = useState({
    provider: [],
    category: [],
    subcategory: [],
    product: [],
  });
  const [isAllChecked, setIsAllChecked] = useState({
    provider: true,
    category: true,
    subcategory: true,
    product: true,
  });
  const handleRangeChange = (e) => {
    setValue(e.target.value);
  };
  const { data, loading, error, fetchData } = useFetch(
    "http://localhost:8080/api/stock/filterSettings"
  );
  useEffect(() => {
    if (data) {
      setCheckboxStates({
        provider: data.filterProviderDTOList?.map((provider) => ({
          id: provider.id,
          checked: false,
        })),
        category: data.filterCategoryDTOS?.map((category) => ({
          id: category.id,
          checked: false,
        })),
        subcategory: data.filterSubcategoryDTOS?.map((subcategory) => ({
          id: subcategory.id,
          checked: false,
        })),
        product: data.filterProductDTOS?.map((product) => ({
          id: product.id,
          checked: false,
        })),
      });
      const filteredProducts = data.filterProductDTOS.map((item) => ({
        ...item,
        criteriasIds: [],
      }));

      console.log("filteredPd:", filteredProducts);
      setDisplayedValues({
        provider: data.filterProviderDTOList,
        category: data.filterCategoryDTOS,
        subcategory: data.filterSubcategoryDTOS,
        product: filteredProducts,
      });
    }
  }, [data]);
  const resetAllCheckboxes = () => {
    setCheckboxStates({
      provider: data.filterProviderDTOList?.map((provider) => ({
        id: provider.id,
        checked: false,
      })),
      category: data.filterCategoryDTOS?.map((category) => ({
        id: category.id,
        checked: false,
      })),
      subcategory: data.filterSubcategoryDTOS?.map((subcategory) => ({
        id: subcategory.id,
        checked: false,
      })),
      product: data.filterProductDTOS?.map((product) => ({
        id: product.id,
        checked: false,
      })),
    });
  };
  const resetSerachCriteria = (attribute) => {
    const dataKey =
      attribute === "product"
        ? "filterProductDTOS"
        : attribute === "provider"
        ? "filterProviderDTOList"
        : attribute === "category"
        ? "filterCategoryDTOS"
        : "filterSubcategoryDTOS";
    if (dataKey === "filterProductDTOS") {
      const filteredProducts = data.filterProductDTOS.map((item) => ({
        ...item,
        criteriasIds: [],
      }));
      setDisplayedValues({
        ...displaiedValues,
        product: filteredProducts,
      });
    } else
      setDisplayedValues({
        ...displaiedValues,
        [attribute]: data[dataKey],
      });
  };
  const changeCheckboxState = (attribute) => {
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [attribute]: prevStates[attribute].map((checkbox) => ({
        ...checkbox,
        checked: false,
      })),
    }));
  };
  const handleChange = (e) => {
    console.log(e.target.value);
    console.log(e.target.id);
    console.log(e.target.getAttribute("data-custom-attribute"));
    const attribute = e.target.getAttribute("data-custom-attribute");
    const checked = e.target.checked;
    const id = e.target.value;
    console.log("id:", id);
    console.log("cheked:", e.target.checked);
    if (e.target.value == "all") {
      console.log("attribute=", attribute, "cheked=", checked);
      setIsAllChecked({
        ...isAllChecked,
        [attribute]: checked,
      });
      changeCheckboxState(attribute);
      if (attribute === "product") {
        resetAllCheckboxes();
        setIsAllChecked({
          provider: true,
          category: true,
          subcategory: true,
          product: true,
        });
      }
      resetSerachCriteria(attribute);
      return;
    }
    setIsAllChecked({
      ...isAllChecked,
      [attribute]: false,
    });
    setCheckboxStates((prevStates) => ({
      ...prevStates,
      [attribute]: prevStates[attribute].map((checkbox) =>
        parseInt(checkbox.id) === parseInt(id)
          ? { ...checkbox, checked }
          : checkbox
      ),
    }));

    if (attribute !== "product") {
      console.log("attribute:", attribute);
      setIsAllChecked({
        ...isAllChecked,
        [attribute]: false,
        product: false,
      });
      console.log(
        displaiedValues[attribute].find(
          (item) => parseInt(item.id) === parseInt(id)
        )?.productsIds
      );
      const productsIds = displaiedValues[attribute].find(
        (item) => parseInt(item.id) === parseInt(id)
      )?.productsIds;

      const hasChecked = checkboxStates[attribute].some(
        (item) => item.checked === true
      );
      const filteredProducts = [];
      if (checked) {
        hasChecked && filteredProducts.push(...displaiedValues.product);
        filteredProducts.push(
          ...data.filterProductDTOS.filter((item) =>
            productsIds.includes(item.id)
          )
        );
      } else {
        filteredProducts.push(
          ...displaiedValues.product.filter(
            (item) => !productsIds.includes(item.id)
          )
        );
      }
      console.log("filteredProducts:", filteredProducts);
      //   if (!hasChecked) {

      // setDisplayedValues({
      //   ...displaiedValues,
      //   product: [...displaiedValues.product, ...filteredProducts],
      // });
      //     return;
      //   }

      //   filteredProducts = displaiedValues.product.filter((item) =>
      //     productsIds.includes(item.id)
      //   );
      setDisplayedValues({
        ...displaiedValues,
        product: filteredProducts,
      });
    }
    console.log(isAllChecked);
  };
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
                {displaiedValues.provider?.map((provider) => (
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
              <BasicInput type="text" placeholder="Căutați categoria" />
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
                {displaiedValues.category?.map((category) => (
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
              <BasicInput type="text" placeholder="Căutați subcategoria" />
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
                {displaiedValues.subcategory?.map((subcategory) => (
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
              <BasicInput type="text" placeholder="Căutați produsul" />
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
                {displaiedValues.product?.map((product) => (
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
          <div></div>
        </>
      )}
    </Modal>
  );
};

export default StocksFilterModal;
