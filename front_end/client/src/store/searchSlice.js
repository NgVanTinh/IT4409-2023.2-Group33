import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const initialState = {
  searchProducts: [],
  searchProductsStatus: STATUS.IDLE,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncSearchProducts.pending, (state, action) => {
        state.searchProductsStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncSearchProducts.fulfilled, (state, action) => {
        state.searchProducts = action.payload;
        state.searchProductsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncSearchProducts.rejected, (state, action) => {
        state.searchProductsStatus = STATUS.FAILED;
      });
  },
});

export const fetchAsyncSearchProducts = createAsyncThunk(
  "search-products/fetch",
  async (keyword) => {
    const response = await fetch(`${BASE_URL}products/search?q=${keyword}`);
    const data = await response.json();
    return data.products;
  }
);

export const { setSearchKeyword } = searchSlice.actions;
export const getAllSearchProducts = (state) => state.search.searchProducts;
export const getAllSearchProductsStatus = (state) =>
  state.search.searchProductsStatus;

export default searchSlice.reducer;
