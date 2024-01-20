import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllProfiles } from "../../slices/profileSlice";
import Spinner from "../layout/Spinner";
import ProfileItem from "./ProfileItem";

const Profiles = () => {
  const { loading, profiles } = useSelector((state) => state.profile);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllProfiles());
  }, []);

  return (
    <>
      {loading ? (
        <>
          <Spinner />
        </>
      ) : (
        <>
          <h1 className="large text-primary">Developers</h1>
          <p className="lead">
            <i className="fa fa-angles-right"></i> &nbsp;Browse and connect with
            developers
          </p>
          <div className="profiles">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileItem key={profile._id} profile={profile} />
              ))
            ) : (
              <h4>No profile found...</h4>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profiles;
