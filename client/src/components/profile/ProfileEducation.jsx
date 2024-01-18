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
        <strong>Degree:&nbsp;</strong>
        {degree}
      </p>
      <p>
        <strong>Field Of Study:&nbsp;</strong>
        {fieldofstudy}
      </p>
      <p>
        <strong>Description:&nbsp;</strong>
        {description}
      </p>
    </div>
  );
};

export default ProfileEducation;
