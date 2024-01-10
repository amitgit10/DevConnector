import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

const alertSlice = createSlice({
  name: "alert",
  initialState: () => initialState,
  reducers: {
    setAlert: (state, action) => {
      const id = nanoid();
      const {
        payload: { alertType, msg, timeout = 4000 },
      } = action;
      const alert = {
        id,
        alertType: alertType,
        msg: msg,
      };
      state.push(alert);

      setTimeout(() => {
        alertSlice.caseReducers.removeAlert(alertSlice.getInitialState(), {
          payload: id,
        });
      }, timeout);
    },
    removeAlert: (state, action) => {
      const { payload } = action;
      console.log(payload);
      console.log(state);
      return state.filter((alert) => alert.id !== payload);
    },
  },
});

export const { setAlert } = alertSlice.actions;
export default alertSlice.reducer;
