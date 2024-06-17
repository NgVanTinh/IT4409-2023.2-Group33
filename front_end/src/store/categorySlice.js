import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, BASE_URL_2 } from "../utils/apiURL";
import { STATUS } from "../utils/status";

// Định nghĩa async thunks
export const fetchAsyncCategories = createAsyncThunk(
  "categories/fetch",
  async () => {
    const response = await fetch(`${BASE_URL_2}products/categories`);
    if (!response.ok) {
      throw new Error("Failed to fetch categories");
    }
    const data = await response.json();
    return data;
  }
);

export const fetchAsyncProductsOfCategory = createAsyncThunk(
  "category-products/fetch",
  async (id) => {
    const response = await fetch(`${BASE_URL_2}products/category/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch products of category ${id}`);
    }
    const data = await response.json();
    const filteredProducts = data.products.filter(
      product => !product.isDeleted === true
    );
    return filteredProducts;
  }
);

const initialState = {
  categories: [],
  categoriesStatus: STATUS.IDLE,
  categoryProducts: [],
  categoryProductsStatus: STATUS.IDLE,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncCategories.pending, (state, action) => {
        state.categoriesStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.categoriesStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncCategories.rejected, (state, action) => {
        state.categoriesStatus = STATUS.FAILED;
      })

      .addCase(fetchAsyncProductsOfCategory.pending, (state, action) => {
        state.categoryProductsStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncProductsOfCategory.fulfilled, (state, action) => {
        state.categoryProducts = action.payload;
        state.categoryProductsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncProductsOfCategory.rejected, (state, action) => {
        state.categoryProductsStatus = STATUS.FAILED;
      });
  },
});

export const getAllCategories = (state) => state.category.categories;
export const getAllProductsOfCategory = (state) =>
  state.category.categoryProducts;
export const getCategoryProductsStatus = (state) =>
  state.category.categoryProductsStatus;

export default categorySlice.reducer;
