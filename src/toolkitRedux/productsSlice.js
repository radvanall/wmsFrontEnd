import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import productsData from "../productsData";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    const response = await axios.get(
      "http://localhost:8080/api/position/readtablepositions"
    );
    console.log("response=", response.data);
    return response.data;
  }
);
// export const fetchProducts = createAsyncThunk("products/fetchProducts", () => {
//   return axios
//     .get("http://localhost:8080/api/position/readtablepositions")
//     .then((response) => response.data);
// });
const productsSlice = createSlice({
  name: "productsState",
  initialState: {
    // data: [...productsData],
    data: [],

    // displaiedData: [...productsData],
    displaiedData: [],
    loading: false,
    error: "",
  },
  reducers: {
    setData(state, action) {
      state.data = action.payload;
      //   return { data: [...action.payload] };
    },
    setDisplaiedData(state, action) {
      state.displaiedData = action.payload;
      //   return { ...state, displaiedData: [...action.payload] };
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
