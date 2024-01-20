import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { getCurrentProfile } from "../../slices/profileSlice";
import Spinner from "../layout/Spinner";
import DashboardActions from "./DashboardActions";
import Experience from "./Experience";
import Education from "./Education";
import DeleteAccount from "./DeleteAccount";

export const Dashboard = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentProfile());
  }, []);

  const {
    auth: { user },
    profile: { loading, profile },
  } = useSelector(
    (state) => ({ auth: state.auth, profile: state.profile }),
    shallowEqual
  );

  //const { experience, education } = profile;

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <>
      <h1 className="large text-primary">Dashboard</h1>
      <p className="lead">
        <i className="fas fa-user"></i>&nbsp; Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <Experience experience={profile.experience} />
          <Education education={profile.education} />
          <DeleteAccount />
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <Link to="/create-profile" className="btn btn-primary my-1">
            Create Profile
          </Link>
        </>
      )}
    </>
  );
};
