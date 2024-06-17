// src/features/user/userSlice.js
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../utils/status";
import { get, post } from "../utils/request";

const initialState = {
  user: null,
  userStatus: STATUS.IDLE,
  users: [],
  usersStatus: STATUS.IDLE,
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
      })
      .addCase(sendOTP.pending, (state) => {
        state.userStatus = STATUS.LOADING;
      })
      .addCase(sendOTP.fulfilled, (state, action) => {
        state.userStatus = STATUS.SUCCEEDED;
        // Xử lý dữ liệu trả về từ action.payload nếu cần
      })
      .addCase(sendOTP.rejected, (state, action) => {
        state.userStatus = STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(resetPassword.pending, (state) => {
        state.userStatus = STATUS.LOADING;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.userStatus = STATUS.SUCCEEDED;
        // xử lý nào ở đây sau khi reset password thành công
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.userStatus = STATUS.FAILED;
        state.error = action.error.message;
      })
      .addCase(fetchAllUsers.pending, (state) => {
        state.usersStatus = STATUS.LOADING;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.usersStatus = STATUS.SUCCEEDED;
        state.users = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.usersStatus = STATUS.FAILED;
        state.error = action.error.message;
      });
  },
});

// Đăng nhập
export const login = createAsyncThunk(
  "user/login",
  async (records, { rejectWithValue }) => {
    try {
      const response = await post("auth/login", records);
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// Đăng ký
export const register = createAsyncThunk(
  "user/register",
  async (records, { rejectWithValue }) => {
    try {
      const response = await post("auth/signup", records);
      return response;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

// gửi OTP đến email
export const sendOTP = createAsyncThunk(
  "user/sendOTP",
  async (values, { rejectWithValue }) => {
    try {
      const response = await post(`users/forgot-password`, {
        email: values.email,
      });
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  }
);

// Gửi yêu cầu reset password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async (values, { rejectWithValue }) => {
    try {
      const response = await post("users/reset-password", {
        email: values.email,
        otp: parseInt(values.otp),
        password: values.password,
      });
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  }
);

// Tạo asyncThunk để lấy tất cả người dùng
export const fetchAllUsers = createAsyncThunk(
  "user/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await get("/users");
      return response;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response);
    }
  }
);

export const { logout } = userSlice.actions;

export default userSlice.reducer;
