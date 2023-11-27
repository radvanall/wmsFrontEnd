import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async (jwt) => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/position/readtablepositions",
        { headers: { Authorization: `Bearer ${jwt}` } }
      );
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
);

const productsSlice = createSlice({
  name: "productsState",
  initialState: {
    data: [],
    displaiedData: [],
    loading: false,
    error: "",
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
    },
    setDisplaiedData(state, action) {
      state.displaiedData = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload;
      state.displaiedData = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      state.loading = false;
      state.data = [];
      state.displaiedData = [];
      state.error = action.error.message;
    });
  },
});
export default productsSlice.reducer;
export const { setData, setDisplaiedData } = productsSlice.actions;
