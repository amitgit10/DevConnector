import React, { useEffect } from "react";
import { getGithubRepos } from "../../slices/profileSlice";
import { useDispatch, useSelector } from "react-redux";

const ProfileGithubRepos = ({ username }) => {
  const dispatch = useDispatch();
  const { repos } = useSelector((state) => state.profile);

  useEffect(() => {
    dispatch(getGithubRepos(username));
  }, []);

  return (
    <div className="profile-github">
      <h2 className="text-primary my-1">
        <i className="fa-brands fa-github"></i> GitHub Repos
      </h2>
      {repos.length > 0 ? (
        repos.map((repo) => (
          <div key={repo.id} className="repo bg-white my-1 p-1">
            <div>
              <h4>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer">
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li className="badge badge-primary">
                  Stars:&nbsp;{repo.stargazers_count}
                </li>
                <li className="badge badge-dark">
                  Watchers:&nbsp;{repo.watchers_count}
                </li>
                <li className="badge badge-light">
                  Forks:&nbsp;{repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      ) : (
        <h4>No Github repository</h4>
      )}
    </div>
  );
};

export default ProfileGithubRepos;
