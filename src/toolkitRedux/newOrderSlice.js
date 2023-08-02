import { createSlice } from "@reduxjs/toolkit";
const newOrderSlice = createSlice({
  name: "newOrderSlice",
  initialState: {
    selectedPosition: {
      id: -1,
      name: "",
      image: "/img/57x57.png",
      quantity: 0,
      currentStock: {},
    },
    formMode: "add",
    selectedTableRowId: -1,
    productQuantity: 0,
  },
  reducers: {
    resetSelectedPosition(state) {
      state.selectedPosition = {
        id: -1,
        name: "",
        image: "/img/57x57.png",
        quantity: 0,
        currentStock: {},
      };
    },
    setSelectedPosition(state, action) {
      state.selectedPosition = action.payload;
    },
    findPosition(state, action) {
      state.selectedPosition = {
        id: -1,
        name: action.payload,
        image: "/img/57x57.png",
        quantity: 0,
        currentStock: {},
      };
    },
    setFormMode(state, action) {
      state.formMode = action.payload;
    },
    setSelectedTableRowId(state, action) {
      state.selectedTableRowId = action.payload;
    },
    setProductQuantity(state, action) {
      state.productQuantity = action.payload;
    },
  },
});
export default newOrderSlice.reducer;
export const {
  resetSelectedPosition,
  setSelectedPosition,
  findPosition,
  setFormMode,
  setSelectedTableRowId,
  setProductQuantity,
} = newOrderSlice.actions;
