import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "../features/categorySlice";
import authReducer from "./authSlice";
import eventReducer from "../features/eventSlice";
import loaderReducer from "./loaderSlice";

export const store = configureStore({
  reducer: {
    categories: categoryReducer,
    auth: authReducer,
    events: eventReducer,
    loader: loaderReducer
  },
});
export default store;
