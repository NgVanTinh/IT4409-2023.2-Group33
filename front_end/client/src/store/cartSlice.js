import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL_2 } from "../utils/apiURL";
import { STATUS } from "../utils/status";
import { getCookie } from "../helpers/cookie";

const initialState = {
  carts: [],
  itemsCount: 0,
  totalAmount: 0,
  isCartMessageOn: false,
  loading: false,
  error: null,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserCart.fulfilled, (state, action) => {
        state.carts = action.payload.products;
        state.itemsCount = action.payload.totalQuantity;
        state.totalAmount = action.payload.discountedTotal;
        state.loading = false;
      })
      .addCase(fetchUserCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        state.carts = action.payload;
        state.itemsCount = action.payload.totalQuantity;
        state.totalAmount = action.payload.discountedTotal;
        state.loading = false;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(removeItemFromCart.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeItemFromCart.fulfilled, (state, action) => {
        state.carts = action.payload.products;
        state.itemsCount = action.payload.totalQuantity;
        state.totalAmount = action.payload.discountedTotal;
        state.loading = false;
      })
      .addCase(removeItemFromCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(clearCartAsync.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCartAsync.fulfilled, (state) => {
        state.carts = [];
        state.itemsCount = 0;
        state.totalAmount = 0;
        state.loading = false;
      })
      .addCase(clearCartAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// Get cart of user
export const fetchUserCart = createAsyncThunk(
  "cart/fetchUserCart",
  async (userId, { rejectWithValue }) => {
    try {
      const token = getCookie("token");
      const response = await fetch(`${BASE_URL_2}carts/user/${userId}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      if (!data) {
        return rejectWithValue("No data received");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Add item to cart
export const addItemToCart = createAsyncThunk(
  "cart/addItemToCart",
  async ({ productId, quantity }, { getState, rejectWithValue }) => {
    try {
      const token = getCookie("token");

      const requestBody = {
        products: [
          {
            id: productId,
            quantity: quantity,
          },
        ],
      };

      const response = await fetch(`${BASE_URL_2}carts/add-to-cart`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }
      const data = await response.json();

      if (!data) {
        return rejectWithValue("No data returned from add to cart");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Remove item from cart
export const removeItemFromCart = createAsyncThunk(
  "cart/removeItemFromCart",
  async (productId, { getState, rejectWithValue }) => {
    try {
      const token = getCookie("token");
      const response = await fetch(
        `${BASE_URL_2}carts/delete-product?productId=${productId}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to remove item from cart");
      }

      const data = await response.json();

      if (!data) {
        return rejectWithValue("No data returned from remove from cart");
      }

      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Clear cart
export const clearCartAsync = createAsyncThunk(
  "cart/clearCart",
  async (_, { getState, rejectWithValue }) => {
    try {
      const token = getCookie("token");
      const response = await fetch(`${BASE_URL_2}carts/clear-cart`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const {
  addToCart,
  setCartMessageOff,
  setCartMessageOn,
  getCartTotal,
  toggleCartQty,
  clearCart,
  removeFromCart,
} = cartSlice.actions;
export const getCartMessageStatus = (state) => state.cart.isCartMessageOn;
export const getAllCarts = (state) => state.cart.carts;
export const getCartItemsCount = (state) => state.cart.itemsCount;
export default cartSlice.reducer;
