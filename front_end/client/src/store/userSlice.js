// src/features/user/userSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { BASE_URL } from "../utils/apiURL";
import { STATUS } from "../utils/status";
import { get, post, edit, del } from "../utils/request";

const initialState = {
  user: null,
  userStatus: STATUS.IDLE,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.userStatus = STATUS.LOADING;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.userStatus = STATUS.SUCCEEDED;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.userStatus = STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(register.pending, (state) => {
        state.userStatus = STATUS.LOADING;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.userStatus = STATUS.SUCCEEDED;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.userStatus = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

// Đăng nhập
export const login = createAsyncThunk(
  "user/login",
  async ({ email, password }) => {
    const response = await get(`users?email=${email}&password=${password}`);

    return response;
  }
);

// Đăng ký
export const register = createAsyncThunk(
  "user/register",
  async (records, { rejectWithValue }) => {
    try {
      const response = await post(`users`, records);

      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// Kiểm tra xem người dùng đã tồn tại chưa
export const checkExist = createAsyncThunk(
  "user/checkExist",
  async ({ key, value }, { rejectWithValue }) => {
    try {
      const response = await get(`users?${key}=${value}`);
      if (response.length > 0) {
        // Nếu tìm thấy người dùng với email này, trả về thông tin người dùng
        return response[0];
      } else {
        // Nếu không tìm thấy, trả về null
        return null;
      }
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const { logout } = userSlice.actions;

export default userSlice.reducer;
