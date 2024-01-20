import React from "react";
import time from "../../utils/formatTime";

const ProfileEducation = ({
  education: { from, to, degree, fieldofstudy, description, school },
}) => {
  return (
    <div>
      <h3>{school}</h3>
      <p>
        {" "}
        {time(from)} - {to ? time(to) : "Now"}
      </p>
      <p>
        <b>Degree:&nbsp;</b>
        {degree}
      </p>
      <p>
        <b>Field Of Study:&nbsp;</b>
        {fieldofstudy}
      </p>
      <p>
        <b>Description:&nbsp;</b>
        {description}
      </p>
    </div>
  );
};

export default ProfileEducation;
