import React, { useEffect } from "react";
import "./TagHolder.css";
import CheckBox from "../CheckBox/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCheckboxChange,
  setFilterCriterias,
  changeStatus,
} from "../../toolkitRedux/stockFilterSlice";
const TagHolder = ({ data, filterCriterias, filterStocks }) => {
  const dispatch = useDispatch();
  const displayedValues = useSelector(
    (state) => state.stockFilterSlice.displayedValues
  );
  const checkboxStates = useSelector(
    (state) => state.stockFilterSlice.checkboxStates
  );
  const rangeValues = useSelector(
    (state) => state.stockFilterSlice.rangeValues
  );
  const status = useSelector((state) => state.stockFilterSlice.status);

  const providers = displayedValues.provider?.filter((item) =>
    filterCriterias.providers.some((id) => parseInt(item.id) === parseInt(id))
  );
  const categories = displayedValues.category?.filter((item) =>
    filterCriterias.categories.some((id) => parseInt(item.id) === parseInt(id))
  );
  const subcategories = displayedValues.subcategory?.filter((item) =>
    filterCriterias.subcategories.some(
      (id) => parseInt(item.id) === parseInt(id)
    )
  );
  const products = displayedValues.product?.filter((item) =>
    filterCriterias.products.some((id) => parseInt(item.id) === parseInt(id))
  );

  const states = Object.keys(status).filter(
    (key) => status[key] === true && key !== "allStates"
  );
  console.log("tagholder product:", products);
  console.log(" displayedValues.product:", displayedValues.product);
  console.log(" filterCriterias.products", filterCriterias.products);
  console.log(
    displayedValues.product?.filter((item) =>
      filterCriterias.products.some((id) => parseInt(item.id) === parseInt(id))
    )
  );
  const getCriteriasIds = (criteria) => {
    return checkboxStates[criteria]
      .filter((item) => item.checked)
      .map((item) => item.id);
  };
  const handleFilter = (attribute, id) => {
    const checkedStatus = Object.keys(status).filter((item) => status[item]);
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

    const filteredCurrentfilterCriterias = {
      ...currentfilterCriterias,
      [attribute]:
        attribute === "status"
          ? checkedStatus.filter((item) => item !== id)
          : currentfilterCriterias[attribute].filter(
              (item) => parseInt(item) !== parseInt(id)
            ),
    };
    dispatch(setFilterCriterias());
    filterStocks(filteredCurrentfilterCriterias);
  };
  const handleChange = (e, attribute) => {
    dispatch(
      handleCheckboxChange({
        attribute: e.target.getAttribute("data-custom-attribute"),
        checked: e.target.checked,
        id: e.target.value,
        currentCategoryName: e.target.id,
        data,
      })
    );
    handleFilter(attribute, e.target.value);
  };
  const handleStatusChange = (e, attribute) => {
    dispatch(
      changeStatus({ value: e.target.value, checked: e.target.checked })
    );

    handleFilter(attribute, e.target.value);
  };
  return (
    <>
      {states.length ||
      products.length ||
      categories.length ||
      subcategories.length ||
      providers.length ? (
        <div className="tag__holder">
          <h2 className="tag__holder__name">Taguri:</h2>

          {providers.map((provider) => (
            <CheckBox
              id={"provider" + provider.id}
              key={"provider" + provider.id}
              value={provider.id}
              name={provider.providerName}
              label={provider.providerName}
              attribute="provider"
              border={true}
              checked={
                checkboxStates?.provider?.find(
                  (item) => item.id === provider.id
                )?.checked || false
              }
              handleChange={(e) => handleChange(e, "providers")}
            />
          ))}

          {categories.map((category) => (
            <CheckBox
              id={"category" + category.id}
              key={"category" + category.id}
              value={category.id}
              name={category.categoryName}
              label={category.categoryName}
              attribute="category"
              border={true}
              checked={
                checkboxStates?.category?.find(
                  (item) => item.id === category.id
                )?.checked || false
              }
              handleChange={(e) => handleChange(e, "categories")}
            />
          ))}

          {subcategories.map((subcategory) => (
            <CheckBox
              id={"subcategory" + subcategory.id}
              key={"subcategory" + subcategory.id}
              value={subcategory.id}
              name={subcategory.subcategoryName}
              label={subcategory.subcategoryName}
              attribute="subcategory"
              border={true}
              checked={
                checkboxStates?.subcategory?.find(
                  (item) => item.id === subcategory.id
                )?.checked || false
              }
              handleChange={(e) => handleChange(e, "subcategories")}
            />
          ))}

          {products.map((product) => (
            <CheckBox
              id={"product" + product.id}
              key={"product" + product.id}
              value={product.id}
              name={product.productName}
              label={product.productName}
              attribute="product"
              border={true}
              checked={
                checkboxStates?.product?.find((item) => item.id === product.id)
                  ?.checked || false
              }
              handleChange={(e) => handleChange(e, "products")}
            />
          ))}

          {states.map((item) => (
            <CheckBox
              id={item}
              value={item}
              name={item}
              label={
                item == "forSale"
                  ? "Pentru vânzare"
                  : item == "inSale"
                  ? "În vânzare"
                  : item == "validated"
                  ? "Validat"
                  : "Nevalidat"
              }
              padding="5px"
              borderRadius="5px"
              width="150px"
              border={true}
              checked={status[item]}
              handleChange={(e) => handleStatusChange(e, "status")}
            />
          ))}
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default TagHolder;
