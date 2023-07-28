import { createSlice } from "@reduxjs/toolkit";
const getCriteriasIds = (criteria, checkboxStates) => {
  return checkboxStates[criteria]
    .filter((item) => item.checked)
    .map((item) => item.id);
};
const stockFilterSlice = createSlice({
  name: "stockFilterSlice",
  initialState: {
    rangeValues: {
      maxBuyingPrice: 0,
      minBuyingPrice: 0,
      maxSellingPrice: 0,
      minSellingPrice: 0,
      maxQuantity: 0,
      minQuantity: 0,
    },

    displayedValues: {
      provider: [],
      category: [],
      subcategory: [],
      product: [],
    },
    inputValues: {
      product: "",
      provider: "",
      category: "",
      subcategory: "",
    },
    status: {
      allStates: true,
      forSale: false,
      inSale: false,
      validated: false,
      unvalidated: false,
    },
    checkboxStates: {
      provider: [],
      category: [],
      subcategory: [],
      product: [],
    },
    isAllChecked: {
      provider: true,
      category: true,
      subcategory: true,
      product: true,
    },
    filterCriterias: null,
  },
  reducers: {
    setRangeValues(state, action) {
      console.log("action", action);
      state.rangeValues = {
        ...state.rangeValues,
        [action.payload.id]: action.payload.value,
      };
    },
    resetRangeValues(state, action) {
      state.rangeValues = action.payload;
    },
    setInputValues(state, action) {
      state.inputValues = {
        ...state.inputValues,
        [action.payload.attribute]: action.payload.value,
      };
    },
    resetInputValues(state) {
      state.inputValues = {
        product: "",
        provider: "",
        category: "",
        subcategory: "",
      };
    },
    setDisplayedValues(state, action) {
      state.displayedValues = {
        ...state.displayedValues,
        [action.payload.attribute]: action.payload.value,
      };
    },
    resetDisplayedValues(state, action) {
      state.displayedValues = action.payload;
    },
    resetStatus(state) {
      state.status = {
        allStates: true,
        forSale: false,
        inSale: false,
        validated: false,
        unvalidated: false,
      };
    },
    changeStatus(state, action) {
      const currendStatus = action.payload.value;
      const checked = action.payload.checked;
      if (currendStatus == "allStates")
        state.status = {
          allStates: checked,
          inSale: false,
          forSale: false,
          validated: false,
          unvalidated: false,
        };
      else
        state.status = {
          ...state.status,
          allStates: false,
          [currendStatus]: checked,
        };
    },
    resetCheckboxStates(state, action) {
      console.log("data=", action.payload);
      const data = action.payload;
      state.checkboxStates = {
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
      };
    },
    setCheckboxStatesToFalse(state, action) {
      state.checkboxStates = {
        ...state.checkboxStates,
        [action.payload.attribute]: state.checkboxStates[
          action.payload.attribute
        ].map((checkbox) => ({
          ...checkbox,
          checked: false,
        })),
      };
    },
    setCheckboxStates(state, action) {
      state.checkboxStates = {
        ...state.checkboxStates,
        [action.payload.attribute]: state.checkboxStates[
          action.payload.attribute
        ].map((checkbox) =>
          parseInt(checkbox.id) === parseInt(action.payload.id)
            ? { ...checkbox, checked: action.payload.checked }
            : checkbox
        ),
      };
    },
    setProductCheckboxStates(state, action) {
      state.checkboxStates = {
        ...state.checkboxStates,
        product: action.payload,
      };
    },
    setIsAllChecked(state, action) {
      state.isAllChecked = {
        ...state.isAllChecked,
        [action.payload.attribute]: action.payload.checked,
      };
    },
    resetIsAllChecked(state) {
      state.isAllChecked = {
        provider: true,
        category: true,
        subcategory: true,
        product: true,
      };
    },
    changeIsAllChecked(state, action) {
      state.isAllChecked = {
        ...state.isAllChecked,
        [action.payload.attribute]: false,
        product: false,
      };
    },
    setFilterCriterias(state) {
      // const providers = getCriteriasIds("provider",state.checkboxStates);
      // const categories = getCriteriasIds("category",state.checkboxStates);
      // const subcategories = getCriteriasIds("subcategory",state.checkboxStates);
      // const products = getCriteriasIds("product",state.checkboxStates);
      const checkedStatus = Object.keys(state.status).filter(
        (item) => state.status[item]
      );
      state.filterCriterias = {
        providers: getCriteriasIds("provider", state.checkboxStates),
        categories: getCriteriasIds("category", state.checkboxStates),
        subcategories: getCriteriasIds("subcategory", state.checkboxStates),
        products: getCriteriasIds("product", state.checkboxStates),
        status: checkedStatus,
        maxBuyingPrice: state.rangeValues.maxBuyingPrice,
        minBuyingPrice: state.rangeValues.minBuyingPrice,
        maxSellingPrice: state.rangeValues.maxSellingPrice,
        minSellingPrice: state.rangeValues.minSellingPrice,
        maxQuantity: state.rangeValues.maxQuantity,
        minQuantity: state.rangeValues.minQuantity,
      };
    },
    resetFilterCriterias(state) {
      state.filterCriterias = null;
    },
  },
});
export default stockFilterSlice.reducer;
export const {
  setRangeValues,
  resetRangeValues,
  setInputValues,
  resetInputValues,
  setDisplayedValues,
  resetDisplayedValues,
  resetStatus,
  changeStatus,
  resetCheckboxStates,
  setCheckboxStatesToFalse,
  setCheckboxStates,
  setProductCheckboxStates,
  setIsAllChecked,
  resetIsAllChecked,
  changeIsAllChecked,
  setFilterCriterias,
  resetFilterCriterias,
} = stockFilterSlice.actions;
