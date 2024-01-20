import React, { useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";
import { getProfileByUserId } from "../../slices/profileSlice";
import Spinner from "../layout/Spinner";
import ProfileTop from "./ProfileTop";
import ProfileAbout from "./ProfileAbout";
import ProfileExperience from "./ProfileExperience";
import ProfileEducation from "./ProfileEducation";
import ProfileGithubRepos from "./ProfileGithubRepos";

const Profile = () => {
  const { user_id } = useParams();
  const dispatch = useDispatch();
  const {
    auth: { isAuthenticated, loading: authLoading, user },
    profile: { profile, loading },
  } = useSelector(
    (state) => ({ auth: state.auth, profile: state.profile }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(getProfileByUserId(user_id));
  }, []);

  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <>
          <Link to="/profiles" className="btn">
            <b>Back To Profiles</b>
          </Link>
          {isAuthenticated && !authLoading && user._id === profile.user._id && (
            <Link to="/edit-profile" className="btn">
              <i className="fas fa-user-circle text-primary"></i>&nbsp;
              <b>Edit Profile</b>
            </Link>
          )}

          <div className="profile-grid my-1">
            <ProfileTop profile={profile} />
            <ProfileAbout profile={profile} />

            <div className="profile-exp bg-white p-2">
              <h2 className="text-primary">Experiences</h2>
              {profile.experience.length > 0 ? (
                <>
                  {profile.experience.map((experience) => (
                    <ProfileExperience
                      key={experience._id}
                      experience={experience}
                    />
                  ))}
                </>
              ) : (
                <h4>No experience credentials</h4>
              )}
            </div>

            <div className="profile-edu bg-white p-2">
              <h2 className="text-primary">Education</h2>
              {profile.education.length > 0 ? (
                <>
                  {profile.education.map((education) => (
                    <ProfileEducation
                      key={education._id}
                      education={education}
                    />
                  ))}
                </>
              ) : (
                <h4>No education credentials</h4>
              )}
            </div>
            {profile.githubusername && (
              <ProfileGithubRepos username={profile.githubusername} />
            )}
          </div>
        </>
      )}
    </>
  );
};

export default Profile;
