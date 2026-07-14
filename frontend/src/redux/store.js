import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import productReducer from "./slices/productSlice.js";
import cartReducer from "./slices/cartSlice.js";
import checkoutReducer from "./slices/checkoutSlice.js";
import orderReducer from "./slices/orderSlice.js";
import adminReducer from "./slices/adminSlice.js";
import adminProductReducer from "./slices/adminProductSlice.js";
import adminOrderReducer from "./slices/adminOrderSlice.js";
import couponReducer from "./slices/couponSlice.js";

const store = configureStore({
  reducer: {
    // Add your reducers here
    auth: authReducer,
    products: productReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    admin: adminReducer,
    adminProducts: adminProductReducer,
    adminOrders: adminOrderReducer,
    coupon: couponReducer,
  },
});

export default store;