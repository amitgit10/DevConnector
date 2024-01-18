import { configureStore } from "@reduxjs/toolkit";
import alertSlice from "./slices/alertSlice";
import authSlice from "./slices/authSlice";
import profileSlice from "./slices/profileSlice";
import postSlice from "./slices/postSlice";

const store = configureStore({
  reducer: {
    alert: alertSlice,
    auth: authSlice,
    profile: profileSlice,
    post: postSlice,
  },
});

export default store;
