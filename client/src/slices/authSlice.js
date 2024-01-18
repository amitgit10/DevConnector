import { createSlice } from "@reduxjs/toolkit";
import { alert } from "./alertSlice";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";

const initialState = {
  token: localStorage.getItem("token"),
  user: null,
  loading: true,
  isAuthenticated: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      authSlice.caseReducers.registerSuccess(state, action);
    },
    loginFail: (state, action) => {
      authSlice.caseReducers.registerFail(state, action);
    },
    logout: (state, action) => {
      authSlice.caseReducers.registerFail(state, action);
    },
    accountDeleted: (state, action) => {
      authSlice.caseReducers.registerFail(state, action);
    },
    registerSuccess: (state, action) => {
      const {
        payload: { token },
      } = action;

      localStorage.setItem("token", token);

      state.token = token;
      state.isAuthenticated = true;
      state.loading = false;
    },
    registerFail: (state, action) => {
      localStorage.removeItem("token");
      state.user = null;
      state.token = null;
      state.isAuthenticated = false;
      state.loading = false;
    },
    setUser: (state, action) => {
      const { payload } = action;

      state.user = payload;
      state.isAuthenticated = true;
      state.loading = false;
    },
    authError: (state, action) => {
      authSlice.caseReducers.registerFail(state);
    },
  },
});

// Load User

export const loadUser = () => async (dispatch) => {
  const token = localStorage.getItem("token");

  if (token) {
    setAuthToken(token);
  }

  try {
    const res = await axios.get("/api/auth");

    dispatch(setUser(res.data));
  } catch (error) {
    dispatch(authError());
  }
};

// Login User
export const login =
  ({ email, password }) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const body = JSON.stringify({ email, password });

    try {
      const res = await axios.post("/api/auth", body, config);

      //dispatch(alert("Logged in successfully!", "success"));

      dispatch(loginSuccess(res.data));

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error, index) => {
          dispatch(alert(error.msg, "danger", 1000 * index + 2000));
        });
      }
      dispatch(loginFail());
    }
  };

// Register User
export const registerUser =
  ({ name, email, password }) =>
  async (dispatch) => {
    const config = {
      headers: { "Content-Type": "application/json" },
    };

    const body = JSON.stringify({ name, email, password });

    try {
      const res = await axios.post("/api/users", body, config);

      //dispatch(alert("Registered Successfully!", "success"));

      dispatch(registerSuccess(res.data));

      dispatch(loadUser());
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error, index) => {
          dispatch(alert(error.msg, "danger", 1000 * index + 2000));
        });
      }
      dispatch(registerFail());
    }
  };

export const {
  registerFail,
  registerSuccess,
  setUser,
  authError,
  loginFail,
  loginSuccess,
  logout,
  accountDeleted,
} = authSlice.actions;
export default authSlice.reducer;
