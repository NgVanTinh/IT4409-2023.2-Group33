import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL, BASE_URL_2 } from "../utils/apiURL";
import { STATUS } from "../utils/status";

const initialState = {
  products: [],
  originalProducts: [],
  filters: {
    price: null,
    category: null,
    rating: null,
  },
  currentSort: null,
  productsStatus: STATUS.IDLE,
  productSingle: [],
  productSingleStatus: STATUS.IDLE,
  similarProducts: [],
  similarProductsStatus: STATUS.IDLE,
};

// Hàm áp dụng bộ lọc
function applyFilters(products, filters) {
  let filteredProducts = products;
  if (filters.price) {
    filteredProducts = filteredProducts.filter((product) => {
      const discountedPrice =
        product.price * (1 - product.discountPercentage / 100);
      return (
        discountedPrice >= filters.price.min &&
        discountedPrice <= filters.price.max
      );
    });
  }
  if (filters.category) {
    filteredProducts = filteredProducts.filter(
      (product) => product.category === filters.category
    );
  }
  if (filters.rating) {
    const minRating = parseFloat(filters.rating);
    const maxRating = minRating + 1;

    filteredProducts = filteredProducts.filter((product) => {
      const productRating = parseFloat(product.rating);
      return productRating >= minRating && productRating < maxRating;
    });
  }
  return filteredProducts;
}

// Hàm áp dụng sắp xếp
function applySort(products, sortOption) {
  switch (sortOption) {
    case "name-asc":
      return products.sort((a, b) => a.title.localeCompare(b.title));
    case "name-desc":
      return products.sort((a, b) => b.title.localeCompare(a.title));
    case "price-asc":
      return products.sort((a, b) => a.price - b.price);
    case "price-desc":
      return products.sort((a, b) => b.price - a.price);
    default:
      return products;
  }
}

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    setFilter: (state, action) => {
      const { filterType, value } = action.payload;
      state.filters[filterType] = value; // Cập nhật trạng thái bộ lọc
      let filteredProducts = applyFilters(
        state.originalProducts,
        state.filters
      );
      state.products = applySort(filteredProducts, state.currentSort); // Áp dụng lại cả sắp xếp
    },
    resetFilter: (state, action) => {
      const { filterType } = action.payload;
      state.filters[filterType] = null; // Đặt lại bộ lọc cụ thể
      let filteredProducts = applyFilters(
        state.originalProducts,
        state.filters
      );
      state.products = applySort(filteredProducts, state.currentSort); // Áp dụng lại cả sắp xếp
    },
    setSort: (state, action) => {
      state.currentSort = action.payload; // Cập nhật trạng thái sắp xếp
      let sortedProducts = applySort([...state.products], state.currentSort); // Áp dụng sắp xếp trên danh sách hiện tại
      state.products = sortedProducts;
    },
    resetSort: (state) => {
      state.currentSort = null; // Đặt lại trạng thái sắp xếp
      // Không cần áp dụng lại sắp xếp vì đã đặt lại nó
      // Đảm bảo danh sách sản phẩm là danh sách đã lọc gần nhất
      state.products = applyFilters(state.originalProducts, state.filters);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncProducts.pending, (state, action) => {
        state.productStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncProducts.fulfilled, (state, action) => {
        state.originalProducts = action.payload;
        state.products = action.payload;
        state.productsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncProducts.rejected, (state, action) => {
        state.productsStatus = STATUS.FAILED;
      })

      .addCase(fetchAsyncProductSingle.pending, (state, action) => {
        state.productSingleStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncProductSingle.fulfilled, (state, action) => {
        state.productSingle = action.payload;
        state.productSingleStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncProductSingle.rejected, (state, action) => {
        state.productSingleStatus = STATUS.FAILED;
      })
      .addCase(fetchAsyncSimilarProducts.pending, (state) => {
        state.similarProductsStatus = STATUS.LOADING;
      })
      .addCase(fetchAsyncSimilarProducts.fulfilled, (state, action) => {
        state.similarProducts = action.payload;
        state.similarProductsStatus = STATUS.SUCCEEDED;
      })
      .addCase(fetchAsyncSimilarProducts.rejected, (state) => {
        state.similarProductsStatus = STATUS.FAILED;
      });
  },
});

// for getting the products list with limited numbers
export const fetchAsyncProducts = createAsyncThunk(
  "products/fetch",
  async (limit) => {
    const response = await fetch(`${BASE_URL_2}products?limit=${limit}`);
    const data = await response.json();
    return data.products;
  }
);

// getting the single product data also
export const fetchAsyncProductSingle = createAsyncThunk(
  "product-single/fetch",
  async (id) => {
    const response = await fetch(`${BASE_URL_2}products/${id}`);
    const data = await response.json();
    return data;
  }
);

// Tạo async thunk để lấy sản phẩm tương tự
export const fetchAsyncSimilarProducts = createAsyncThunk(
  "products/fetchSimilar",
  async (id) => {
    const response = await fetch(
      `${BASE_URL_2}products/same-products?id=${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch similar products");
    }
    const data = await response.json();
    return data.products; // Giả sử data trả về là mảng các sản phẩm tương tự
  }
);

export const getAllProducts = (state) => state.product.products;
export const getAllProductsStatus = (state) => state.product.productsStatus;
export const getProductSingle = (state) => state.product.productSingle;

export const {
  sortProducts,
  filterProductsByPriceRange,
  resetFiltersAndSorting,
  setFilter,
  resetFilter,
  setSort,
  resetSort,
} = productSlice.actions;

export const getProductSingleStatus = (state) =>
  state.product.productSingleStatus;

export default productSlice.reducer;