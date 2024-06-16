import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { BASE_URL_2 } from "../utils/apiURL";
import { getCookie } from "../helpers/cookie";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  paymentInfo: {},
  ratingResult: null,
  ratingError: null,
  ratingLoading: false,
};

// Create a order
export const createOrder = createAsyncThunk(
  "orders/createOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const token = getCookie("token");
      const response = await fetch(`${BASE_URL_2}api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        throw new Error("Could not create order");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Lấy tất cả đơn hàng của một user
export const fetchOrdersByUser = createAsyncThunk(
  "orders/fetchOrdersByUser",
  async (_, { rejectWithValue }) => {
    try {
      const token = getCookie("token");
      const response = await fetch(`${BASE_URL_2}api/orders/user`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Could not fetch orders");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createVNPAYPayment = createAsyncThunk(
  "orders/createVNPAYPayment",
  async (orderId, { getState, rejectWithValue }) => {
    try {
      const token = getCookie("token");
      const response = await fetch(
        `${BASE_URL_2}payment/create?orderId=${orderId}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Could not process payment with VNPAY");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Rating product of order
export const submitProductRating = createAsyncThunk(
  "orders/submitProductRating",
  async ({ orderId, productId, rate, comment }, { rejectWithValue }) => {
    try {
      const token = getCookie("token");
      const response = await fetch(
        `${BASE_URL_2}rating/create?orderId=${orderId}&productId=${productId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ rate, comment }),
        }
      );

      if (!response.ok) {
        throw new Error("Could not submit product rating");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Định nghĩa orderSlice
const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(fetchOrdersByUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrdersByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrdersByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createVNPAYPayment.pending, (state) => {
        state.loading = true;
      })
      .addCase(createVNPAYPayment.fulfilled, (state, action) => {
        state.loading = false;
        state.paymentInfo = action.payload;
      })
      .addCase(createVNPAYPayment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(submitProductRating.pending, (state) => {
        state.ratingLoading = true;
        state.ratingError = null;
      })
      .addCase(submitProductRating.fulfilled, (state, action) => {
        state.ratingLoading = false;
        state.ratingResult = action.payload;
      })
      .addCase(submitProductRating.rejected, (state, action) => {
        state.ratingLoading = false;
        state.ratingError = action.payload;
      });
  },
});

export const { reducer } = orderSlice;
export default reducer;
