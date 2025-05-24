import { configureStore } from "@reduxjs/toolkit";
import buzzReducer from "../slice/buzzSlice";
import authReducer from "../slice/authSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    buzz: buzzReducer,
  },
});
export default store;