import React from "react";
import { Route } from "react-router-dom";
import { Alert } from "../layout/Alert";
import ProtectedRoute from "./ProtectedRoute";
import { Register } from "../auth/Register";
import { Login } from "../auth/Login";
import Profiles from "../profiles/Profiles";
import Profile from "../profile/Profile";
import { Dashboard } from "../dashboard/Dashboard";
import CreateProfile from "../profile_forms/CreateProfile";
import EditProfile from "../profile_forms/EditProfile";
import AddExperience from "../profile_forms/AddExperience";
import AddEducation from "../profile_forms/AddEducation";
import Posts from "../posts/Posts";
import Post from "../post/Post";
import NotFound from "../layout/NotFound";

const PageRoutes = () => {
  return (
    <section className="container">
      <Alert />
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
      <Route path="*" element={<NotFound />} />
    </section>
  );
};

export default PageRoutes;
