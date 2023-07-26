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
      setRangeValues({
        maxBuyingPrice: data.maxBuyingPrice,
        minBuyingPrice: 0,
        maxSellingPrice: data.maxSellingPrice,
        minSellingPrice: 0,
        maxQuantity: data.maxQuantity,
        minQuantity: 0,
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
    setInputValues({
      ...inputValues,
      [attribute]: "",
    });
    setDisplayedValues({
      ...displaiedValues,
      [attribute]: data[dataKey],
    });
    // const dataKey =
    //   attribute === "product"
    //     ? "filterProductDTOS"
    //     : attribute === "provider"
    //     ? "filterProviderDTOList"
    //     : attribute === "category"
    //     ? "filterCategoryDTOS"
    //     : "filterSubcategoryDTOS";

    // if (dataKey === "filterProductDTOS") {
    //   const filteredProducts = data.filterProductDTOS.map((item) => ({
    //     ...item,
    //     criteriasIds: [],
    //   }));
    //   setDisplayedValues({
    //     ...displaiedValues,
    //     product: filteredProducts,
    //   });
    // } else
    //   setDisplayedValues({
    //     ...displaiedValues,
    //     [attribute]: data[dataKey],
    //   });
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
    const currentCategoryName = e.target.id;
    const isCategoryName = categoryNameIds.some(
      (item) => item === currentCategoryName
    );
    console.log("Is category name:", isCategoryName);
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
        resetSerachCriteria(attribute);
        return;
      }
      resetSerachCriteria(attribute);
    }
    // setIsAllChecked({
    //   ...isAllChecked,
    //   [attribute]: false,
    // });
    !isCategoryName &&
      setCheckboxStates((prevStates) => ({
        ...prevStates,
        [attribute]: prevStates[attribute].map((checkbox) =>
          parseInt(checkbox.id) === parseInt(id)
            ? { ...checkbox, checked }
            : checkbox
        ),
      }));
    !isCategoryName &&
      setIsAllChecked({
        ...isAllChecked,
        [attribute]: false,
        product: false,
      });
    console.log(isAllChecked);
    if (attribute === "product") {
      return;
    }
    // if (checked) {
    const checkedOptions = {
      provider: checkboxStates.provider
        .filter((item) => item.checked)
        .map((item) => item.id),
      category: checkboxStates.category
        .filter((item) => item.checked)
        .map((item) => item.id),
      subcategory: checkboxStates.subcategory
        .filter((item) => item.checked)
        .map((item) => item.id),
    };
    checked
      ? checkedOptions[attribute].push(parseInt(id))
      : (checkedOptions[attribute] = checkedOptions[attribute].filter(
          (item) => parseInt(item) !== parseInt(id)
        ));
    console.log("chekcboxOptions:", checkedOptions);
    const chousenCriterias = {
      provider: data.filterProviderDTOList
        .filter((provider) =>
          checkedOptions.provider.some(
            (item) => parseInt(item) === parseInt(provider.id)
          )
        )
        ?.flatMap((item) => item.productsIds),

      category: data.filterCategoryDTOS
        .filter((category) =>
          checkedOptions.category.some(
            (item) => parseInt(item) === parseInt(category.id)
          )
        )
        ?.flatMap((item) => item.productsIds),

      subcategory: data.filterSubcategoryDTOS
        .filter((subcategory) =>
          checkedOptions.subcategory.some(
            (item) => parseInt(item) === parseInt(subcategory.id)
          )
        )
        ?.flatMap((item) => item.productsIds),
    };
    console.log("chousenCriterias:", chousenCriterias);
    const filteredProducts = [];
    //   filteredProducts.push(
    //     ...data.filterProductDTOS.filter(
    //       (item) =>
    //         chousenCriterias.category.includes(item.id) &&
    //         chousenCriterias.subcategory.includes(item.id) &&
    //         chousenCriterias.provider.includes(item.id)
    //     )
    //   );
    filteredProducts.push(
      ...data.filterProductDTOS.filter((item) => {
        let shouldInclude = true;

        if (
          checkedOptions.category.length &&
          currentCategoryName != "category-all"
        ) {
          shouldInclude =
            shouldInclude && chousenCriterias.category.includes(item.id);
        }

        if (
          checkedOptions.subcategory.length &&
          currentCategoryName != "subcategory-all"
        ) {
          shouldInclude =
            shouldInclude && chousenCriterias.subcategory.includes(item.id);
        }

        if (
          checkedOptions.provider.length &&
          currentCategoryName != "provider-all"
        ) {
          shouldInclude =
            shouldInclude && chousenCriterias.provider.includes(item.id);
        }

        return shouldInclude;
      })
    );
    setDisplayedValues({
      provider:
        currentCategoryName == "provider-all"
          ? data.filterProviderDTOList
          : displaiedValues.provider,
      category:
        currentCategoryName == "category-all"
          ? data.filterCategoryDTOS
          : displaiedValues.category,
      subcategory:
        currentCategoryName == "subcategory-all"
          ? data.filterSubcategoryDTOS
          : displaiedValues.subcategory,
      product: filteredProducts,
    });
    // setDisplayedValues({
    //   ...displaiedValues,
    //   product: filteredProducts,
    // });
    console.log("filteredproduct2::", filteredProducts);
    // }

    // console.log("attribute:", attribute);

    // console.log(
    //   displaiedValues[attribute].find(
    //     (item) => parseInt(item.id) === parseInt(id)
    //   )?.productsIds
    // );
    // const productsIds = displaiedValues[attribute].find(
    //   (item) => parseInt(item.id) === parseInt(id)
    // )?.productsIds;

    // const hasChecked = checkboxStates[attribute].some(
    //   (item) => item.checked === true
    // );
    // const filteredProducts = [];
    // if (checked) {
    //   hasChecked && filteredProducts.push(...displaiedValues.product);
    //   filteredProducts.push(
    //     ...data.filterProductDTOS.filter((item) =>
    //       productsIds.includes(item.id)
    //     )
    //   );
    // } else {
    //   filteredProducts.push(
    //     ...displaiedValues.product.filter(
    //       (item) => !productsIds.includes(item.id)
    //     )
    //   );
    // }
    // console.log("filteredProducts:", filteredProducts);
    // setDisplayedValues({
    //   ...displaiedValues,
    //   product: filteredProducts,
    // });
  };
  const handleInputChange = (e, categoryName) => {
    setIsAllChecked({
      ...isAllChecked,
      [categoryName]: false,
    });
    console.log(e.target.value);
    console.log(categoryName);
    const dataKey = getDataKey(categoryName);
    console.log(dataKey);
    const newValues = data[dataKey].filter(
      (item) =>
        item[`${categoryName}Name`]
          .toLowerCase()
          .includes(e.target.value.toLowerCase()) ||
        (checkboxStates &&
          checkboxStates[categoryName]?.find((el) => el.id === item.id)
            ?.checked)
    );
    // console.log(data[dataKey][`${categoryName}Name`]);
    console.log(newValues);
    setDisplayedValues({
      ...displaiedValues,
      [categoryName]: newValues,
    });
    setInputValues({
      ...inputValues,
      [categoryName]: e.target.value,
    });
    // const newValues=data
  };
  const handleStatusChange = (e) => {
    const currendStatus = e.target.value;
    const checked = e.target.checked;
    if (currendStatus == "allStates")
      setStatus({
        allStates: checked,
        inSale: false,
        forSale: false,
        validated: false,
        unvalidated: false,
      });
    else
      setStatus({
        ...status,
        allStates: false,
        [currendStatus]: checked,
      });
  };
  const handleFilter = () => {
    console.log(checkboxStates);
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
          <button onClick={handleFilter}>Filter</button>
        </>
      )}
    </Modal>
  );
};

export default StocksFilterModal;
