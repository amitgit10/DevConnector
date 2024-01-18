import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = [];

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, action) => {
      const { payload } = action;
      state.push(payload);
    },
    removeAlert: (state, action) => {
      const { payload } = action;
      return state.filter((alert) => alert.id !== payload);
    },
  },
});

const alert =
  (msg, alertType, timeout = 4000) =>
  (dispatch) => {
    const id = nanoid();
    dispatch(
      setAlert({
        msg,
        alertType,
        id,
      })
    );

    setTimeout(() => {
      dispatch(removeAlert(id));
    }, timeout);
  };

export { alert };
export const { setAlert, removeAlert } = alertSlice.actions;
export default alertSlice.reducer;
