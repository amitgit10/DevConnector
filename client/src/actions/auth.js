import axios from "axios";
import { REGISTER_FAIL, REGISTER_SUCCESS } from "./types";
import { setAlert } from "./alert";

const register =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/users", body, config);

      dispatch(setAlert("Registered Successfully!", "success"));
      dispatch({ type: REGISTER_SUCCESS, payload: res.data });
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error, index) => {
          dispatch(setAlert(error.msg, "danger", 1000 * index + 2000));
        });
      }
      dispatch({ type: REGISTER_FAIL });
    }
  };

export { register };
