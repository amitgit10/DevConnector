import React from "react";
import time from "../../utils/formatTime";

const ProfileExperience = ({
  experience: { company, title, from, to, description },
}) => {
  return (
    <div>
      <h3>{company}</h3>
      <p>
        {time(from)} - {to ? time(to) : "Now"}
      </p>
      <p>
        <strong>Position:&nbsp;</strong>
        {title}
      </p>
      <p>
        <strong>Description:&nbsp;</strong>
        {description}
      </p>
    </div>
  );
};

export default ProfileExperience;
