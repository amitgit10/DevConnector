import React from "react";

const ProfileTop = ({
  profile: {
    status,
    location,
    company,
    website,
    social,
    user: { name, avatar },
  },
}) => {
  return (
    <div className="profile-top bg-primary p-2">
      <img className="round-img my-1" src={avatar} alt="" />
      <h2 className="large">{name}</h2>
      <p className="lead">
        {status} {company && <span>at&nbsp;{company}</span>}
      </p>
      <p>{location && <span>{location}</span>}</p>
      <div className="icons my-1">
        {website && (
          <a href={website} target="_blank" rel="noopener noreferrer">
            <i className="fas fa-globe fa-2x"></i>
          </a>
        )}
        {social?.twitter && (
          <a href={social.twitter} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-twitter fa-2x"></i>
          </a>
        )}
        {social?.facebook && (
          <a href={social.facebook} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-facebook fa-2x"></i>
          </a>
        )}
        {social?.youtube && (
          <a href={social.youtube} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-youtube fa-2x"></i>
          </a>
        )}
        {social?.linkedin && (
          <a href={social.linkedin} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-linkedin fa-2x"></i>
          </a>
        )}
        {social?.instagram && (
          <a href={social.instagram} target="_blank" rel="noopener noreferrer">
            <i className="fa-brands fa-instagram fa-2x"></i>
          </a>
        )}
      </div>
    </div>
  );
};

export default ProfileTop;
