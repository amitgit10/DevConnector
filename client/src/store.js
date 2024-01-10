import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./reducers/alert";
import registerReducer from "./reducers/auth";

const store = configureStore({
  reducer: {
    alert: alertReducer,
    register: registerReducer,
  },
});

export default store;
