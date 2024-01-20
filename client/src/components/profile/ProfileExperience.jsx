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
        <b>Position:&nbsp;</b>
        {title}
      </p>
      <p>
        <b>Description:&nbsp;</b>
        {description}
      </p>
    </div>
  );
};

export default ProfileExperience;
