import { configureStore } from "@reduxjs/toolkit";
import sidebarReducer from "./sidebarSlice";
import categoryReducer from "./categorySlice";
import productReducer from "./productSlice";
import cartReducer from "./cartSlice";
import searchReducer from "./searchSlice";
import userReducer from "./userSlice";
import sensitiveDataMiddleware from "../middleware/sensitiveDataMiddleware";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    category: categoryReducer,
    product: productReducer,
    cart: cartReducer,
    search: searchReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sensitiveDataMiddleware),
});

export default store;
