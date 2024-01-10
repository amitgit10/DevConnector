import { REMOVE_ALERT, SET_ALERT } from "./types";
import { nanoid } from "@reduxjs/toolkit";

const setAlert =
  (msg, alertType, timeout = 4000) =>
  (dispatch) => {
    const id = nanoid();
    dispatch({
      type: SET_ALERT,
      payload: {
        msg,
        alertType,
        id,
      },
    });

    setTimeout(() => {
      dispatch({ type: REMOVE_ALERT, payload: id });
    }, timeout);
  };

export { setAlert };
