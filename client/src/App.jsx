import { Navbar } from "./components/layout/Navbar";
import { Landing } from "./components/layout/Landing";
import { Register } from "./components/auth/Register";
import { Login } from "./components/auth/Login";
import { Routes, Route } from "react-router-dom";
import { Alert } from "./components/layout/Alert";
import setAuthToken from "./utils/setAuthToken";
import { useEffect } from "react";
import { loadUser } from "./slices/authSlice";
import { useDispatch } from "react-redux";
import ProtectedRoute from "./components/private_routes/ProtectedRoute";
import { Dashboard } from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile_forms/CreateProfile";
import EditProfile from "./components/profile_forms/EditProfile";
import AddExperience from "./components/profile_forms/AddExperience";
import AddEducation from "./components/profile_forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";

const App = () => {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  if (token) {
    setAuthToken(token);
  }

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <>
      <Navbar />
      <Alert />
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/profiles" element={<Profiles />} />
        <Route exact path="/profile/:user_id" element={<Profile />} />

        <Route
          exact
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/create-profile"
          element={
            <ProtectedRoute>
              <CreateProfile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/add-experience"
          element={
            <ProtectedRoute>
              <AddExperience />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/add-education"
          element={
            <ProtectedRoute>
              <AddEducation />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/posts"
          element={
            <ProtectedRoute>
              <Posts />
            </ProtectedRoute>
          }
        />
        <Route
          exact
          path="/post/:post_id"
          element={
            <ProtectedRoute>
              <Post />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
};
export default App;
