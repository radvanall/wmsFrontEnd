import { createSlice } from "@reduxjs/toolkit";
const getCriteriasIds = (criteria, checkboxStates) => {
  return checkboxStates[criteria]
    .filter((item) => item.checked)
    .map((item) => item.id);
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
const categoryNameIds = [
  "category-all",
  "product-all",
  "subcategory-all",
  "provider-all",
];
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
    navigate: false,
  },

  reducers: {
    setNavigate(state, action) {
      state.navigate = action.payload;
    },
    setRangeValues(state, action) {
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
      console.log("enter checkbox slice:", action.payload.id);
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
    filterStocksByProductId(state, action) {
      stockFilterSlice.caseReducers.changeIsAllChecked(state, {
        type: "changeIsAllChecked",
        payload: {
          attribute: "product",
        },
      });
      stockFilterSlice.caseReducers.setCheckboxStates(state, {
        type: "setCheckboxStates",
        payload: {
          attribute: "product",
          id: action.payload,
          checked: true,
        },
      });
      state.filterCriterias = {
        providers: [],
        categories: [],
        subcategories: [],
        products: [action.payload],
        status: ["allStates"],
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
    handleCheckboxChange(state, action) {
      const { attribute, checked, id, currentCategoryName, data } =
        action.payload;
      const isCategoryName = categoryNameIds.some(
        (item) => item === currentCategoryName
      );
      if (id === "all") {
        stockFilterSlice.caseReducers.setIsAllChecked(state, {
          type: "setIsAllChecked",
          payload: { attribute, checked },
        });
        stockFilterSlice.caseReducers.setCheckboxStatesToFalse(state, {
          type: "setCheckboxStatesToFalse",
          payload: { attribute },
        });
        const dataKey = getDataKey(attribute);
        stockFilterSlice.caseReducers.setInputValues(state, {
          type: "setInputValues",
          payload: { attribute, value: "" },
        });
        stockFilterSlice.caseReducers.setDisplayedValues(state, {
          type: "setDisplayedValues",
          payload: {
            attribute,
            value: data[dataKey],
          },
        });
        if (attribute === "product") {
          stockFilterSlice.caseReducers.resetCheckboxStates(state, {
            type: "resetCheckboxStates",
            payload: data,
          });
          stockFilterSlice.caseReducers.resetIsAllChecked(state, {
            type: "resetIsAllChecked",
          });
          return;
        }
      }
      !isCategoryName &&
        stockFilterSlice.caseReducers.setCheckboxStates(state, {
          type: "setCheckboxStates",
          payload: {
            attribute,
            id,
            checked,
          },
        });
      !isCategoryName &&
        stockFilterSlice.caseReducers.changeIsAllChecked(state, {
          type: "changeIsAllChecked",
          payload: { attribute },
        });
      if (attribute === "product") return;
      const checkedOptions = {
        provider: state.checkboxStates.provider
          .filter((item) => item.checked)
          .map((item) => item.id),
        category: state.checkboxStates.category
          .filter((item) => item.checked)
          .map((item) => item.id),
        subcategory: state.checkboxStates.subcategory
          .filter((item) => item.checked)
          .map((item) => item.id),
      };
      checked
        ? checkedOptions[attribute].push(parseInt(id))
        : (checkedOptions[attribute] = checkedOptions[attribute].filter(
            (item) => parseInt(item) !== parseInt(id)
          ));
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
      const filteredProducts = [];
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
      const currentProducts = filteredProducts.map((item) => item.id);
      const newCheckboxProductStates = state.checkboxStates.product.map(
        (product) =>
          currentProducts.some(
            (item) => parseInt(item) === parseInt(product.id)
          )
            ? product
            : { id: product.id, checked: false }
      );
      stockFilterSlice.caseReducers.setProductCheckboxStates(state, {
        type: "setProductCheckboxStates",
        payload: newCheckboxProductStates,
      });
      stockFilterSlice.caseReducers.resetDisplayedValues(state, {
        type: "resetDisplayedValues",
        payload: {
          provider:
            currentCategoryName == "provider-all"
              ? data.filterProviderDTOList
              : state.displayedValues.provider,
          category:
            currentCategoryName == "category-all"
              ? data.filterCategoryDTOS
              : state.displayedValues.category,
          subcategory:
            currentCategoryName == "subcategory-all"
              ? data.filterSubcategoryDTOS
              : state.displayedValues.subcategory,
          product: filteredProducts,
        },
      });
    },
    resetAllCriterias(state, action) {
      const data = action.payload;
      stockFilterSlice.caseReducers.resetInputValues(state);
      stockFilterSlice.caseReducers.resetCheckboxStates(state, {
        type: "resetAllCheckboxes",
        payload: data,
      });
      stockFilterSlice.caseReducers.resetDisplayedValues(state, {
        type: "resetDisplayedValues",
        payload: {
          provider: data.filterProviderDTOList,
          category: data.filterCategoryDTOS,
          subcategory: data.filterSubcategoryDTOS,
          product: data.filterProductDTOS,
        },
      });
      stockFilterSlice.caseReducers.resetRangeValues(state, {
        type: "resetRangeValues",
        payload: {
          maxBuyingPrice: data.maxBuyingPrice,
          minBuyingPrice: 0,
          maxSellingPrice: data.maxSellingPrice,
          minSellingPrice: 0,
          maxQuantity: data.maxQuantity,
          minQuantity: 0,
        },
      });
      stockFilterSlice.caseReducers.resetIsAllChecked(state);
      stockFilterSlice.caseReducers.resetStatus(state);
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
  handleCheckboxChange,
  resetAllCriterias,
  filterStocksByProductId,
  setNavigate,
} = stockFilterSlice.actions;
