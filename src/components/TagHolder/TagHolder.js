import React, { useEffect } from "react";
import "./TagHolder.css";
import CheckBox from "../CheckBox/CheckBox";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCheckboxChange,
  setFilterCriterias,
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

  const getCriteriasIds = (criteria) => {
    return checkboxStates[criteria]
      .filter((item) => item.checked)
      .map((item) => item.id);
  };

  const handleFilter = (attribute, id) => {
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
    const filteredCurrentfilterCriterias = {
      ...currentfilterCriterias,
      [attribute]: currentfilterCriterias[attribute].filter(
        (item) => parseInt(item) !== parseInt(id)
      ),
    };
    dispatch(setFilterCriterias());
    filterStocks(filteredCurrentfilterCriterias);
    console.log(checkboxStates);
    console.log(status);
    console.log(rangeValues);
  };
  const handleChange = (e, attribute) => {
    console.log("tag-data", data);
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
  return (
    <div className="tag__holder">
      <h2 className="tag__holder__name">Tags</h2>
      {displayedValues.provider
        ?.filter((item) =>
          filterCriterias.providers.some((id) => parseInt(item.id) === id)
        )
        .map((provider) => (
          <CheckBox
            id={"provider" + provider.id}
            key={"provider" + provider.id}
            value={provider.id}
            name={provider.providerName}
            label={provider.providerName}
            attribute="provider"
            border={true}
            checked={
              checkboxStates?.provider?.find((item) => item.id === provider.id)
                ?.checked || false
            }
            handleChange={(e) => handleChange(e, "providers")}
          />
        ))}
      {displayedValues.category
        ?.filter((item) =>
          filterCriterias.categories.some((id) => parseInt(item.id) === id)
        )
        .map((category) => (
          <CheckBox
            id={"category" + category.id}
            key={"category" + category.id}
            value={category.id}
            name={category.categoryName}
            label={category.categoryName}
            attribute="category"
            border={true}
            checked={
              checkboxStates?.category?.find((item) => item.id === category.id)
                ?.checked || false
            }
            handleChange={(e) => handleChange(e, "categories")}
          />
        ))}
      {displayedValues.subcategory
        ?.filter((item) =>
          filterCriterias.subcategories.some((id) => parseInt(item.id) === id)
        )
        .map((subcategory) => (
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
      {displayedValues.product
        ?.filter((item) =>
          filterCriterias.products.some((id) => parseInt(item.id) === id)
        )
        .map((product) => (
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
    </div>
  );
};

export default TagHolder;
