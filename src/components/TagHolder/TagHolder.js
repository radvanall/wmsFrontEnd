import React from "react";
import "./TagHolder.css";
import CheckBox from "../CheckBox/CheckBox";
import { useDispatch, useSelector } from "react-redux";
const TagHolder = ({ data }) => {
  const displayedValues = useSelector(
    (state) => state.stockFilterSlice.displayedValues
  );
  const checkboxStates = useSelector(
    (state) => state.stockFilterSlice.checkboxStates
  );
  const checkedOptions = {
    product: checkboxStates.product
      .filter((item) => item.checked)
      .map((item) => item.id),
    category: checkboxStates.category
      .filter((item) => item.checked)
      .map((item) => item.id),
    subcategory: checkboxStates.subcategory
      .filter((item) => item.checked)
      .map((item) => item.id),
    provider: checkboxStates.provider
      .filter((item) => item.checked)
      .map((item) => item.id),
  };
  console.log("checkedOptions:", checkedOptions);
  return (
    <div className="tag__holder">
      <h2 className="tag__holder__name">Tags</h2>
      {displayedValues.provider
        ?.filter((item) =>
          checkedOptions.provider.some((id) => parseInt(item.id) === id)
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
            // handleChange={handleChange}
          />
        ))}
    </div>
  );
};

export default TagHolder;
