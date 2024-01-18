import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { alert } from "./alertSlice";
import { accountDeleted } from "./authSlice";

const initialState = {
  profile: null,
  profiles: [],
  loading: true,
  repos: [],
  error: {},
};

const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    getProfile: (state, action) => {
      const { payload } = action;
      state.profile = payload;
      state.loading = false;
    },
    getProfiles: (state, action) => {
      const { payload } = action;
      state.profiles = payload;
      state.loading = false;
    },
    getRepos: (state, action) => {
      const { payload } = action;
      state.repos = payload;
      state.loading = false;
    },
    updateProfile: (state, action) => {
      profileSlice.caseReducers.getProfile(state, action);
    },
    profileError: (state, action) => {
      const { payload } = action;
      state.error = payload;
      state.loading = false;
      state.profile = null;
    },
    clearProfile: (state, action) => {
      state.profile = null;
      state.loading = false;
      state.repos = [];
    },
  },
});

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch(getProfile(res.data));
  } catch (err) {
    dispatch(
      profileError({
        msg: err.response.data.msg,
        status: err.response.status,
      })
    );
  }
};

// Get all profiles
export const getAllProfiles = () => async (dispatch) => {
  dispatch(clearProfile());
  try {
    const res = await axios.get("/api/profile");
    dispatch(getProfiles(res.data));
  } catch (err) {
    dispatch(
      profileError({
        msg: err.response.data.msg,
        status: err.response.status,
      })
    );
  }
};

// Get all profile by user id
export const getProfileByUserId = (user_id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/user/${user_id}`);
    dispatch(getProfile(res.data));
  } catch (err) {
    dispatch(
      profileError({
        msg: err.response.data.msg,
        status: err.response.status,
      })
    );
  }
};

// Get github repos
export const getGithubRepos = (username) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/profile/github/${username}`);
    dispatch(getRepos(res.data));
  } catch (err) {
    dispatch(
      profileError({
        msg: err.response.data.msg,
        status: err.response.status,
      })
    );
  }
};

// Create/Update Profile
export const createProfile =
  (formdata, navigate, edit = false) =>
  async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.post("/api/profile", formdata, config);

      dispatch(getProfile(res.data));
      dispatch(alert(edit ? "Profile Updated" : "Profile Created", "success"));

      if (!edit) {
        navigate("/dashboard");
      }
    } catch (err) {
      console.log("Errors: ", err);
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error, index) => {
          dispatch(alert(error.msg, "danger", 1000 * index + 3000));
        });
      }
      dispatch(
        profileError({
          msg: err.response.data.msg,
          status: err.response.status,
        })
      );
    }
  };

// Add/Update Experience
export const addOrUpdateExperience =
  (formdata, navigate) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put("/api/profile/experience", formdata, config);

      dispatch(updateProfile(res.data));
      dispatch(alert("Experience Added", "success"));

      navigate("/dashboard");
    } catch (err) {
      console.log("Errors: ", err);
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error, index) => {
          dispatch(alert(error.msg, "danger", 1000 * index + 3000));
        });
      }
      dispatch(
        profileError({
          msg: err.response.data.msg,
          status: err.response.status,
        })
      );
    }
  };

// Add/Update Education
export const addOrUpdateEducation =
  (formdata, navigate) => async (dispatch) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const res = await axios.put("/api/profile/education", formdata, config);

      dispatch(updateProfile(res.data));
      dispatch(alert("Education Added", "success"));

      navigate("/dashboard");
    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error, index) => {
          dispatch(alert(error.msg, "danger", 1000 * index + 3000));
        });
      }
      dispatch(
        profileError({
          msg: err.response.data.msg,
          status: err.response.status,
        })
      );
    }
  };

// Delete Experience
export const deleteExperience = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/experience/${id}`);

    dispatch(updateProfile(res.data));
    dispatch(alert("Experience Removed", "success"));
  } catch (error) {
    dispatch(
      profileError({
        msg: err.response.data.msg,
        status: err.response.status,
      })
    );
  }
};

// Delete Education
export const deleteEducation = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/education/${id}`);

    dispatch(updateProfile(res.data));
    dispatch(alert("Education Removed", "success"));
  } catch (error) {
    dispatch(
      profileError({
        msg: err.response.data.msg,
        status: err.response.status,
      })
    );
  }
};

// Delete user & profile
export const deleteAccount = () => async (dispatch) => {
  if (window.confirm("Are you sure? This cannot be undone")) {
    try {
      await axios.delete("/api/profile");

      dispatch(clearProfile());
      dispatch(accountDeleted());
      dispatch(alert("Your account has been permanently deleted", "success"));
    } catch (error) {
      dispatch(
        profileError({
          msg: err.response.data.msg,
          status: err.response.status,
        })
      );
    }
  }
};

export const {
  getProfile,
  profileError,
  clearProfile,
  updateProfile,
  getProfiles,
  getRepos,
} = profileSlice.actions;
export default profileSlice.reducer;
