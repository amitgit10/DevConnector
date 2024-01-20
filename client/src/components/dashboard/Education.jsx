import React from "react";
import { useDispatch } from "react-redux";
import { deleteEducation } from "../../slices/profileSlice";
import time from "../../utils/formatTime";

const Education = ({ education }) => {
  const dispatch = useDispatch();

  const educations = education.map((edu) => (
    <tr key={edu._id}>
      <td>{edu.school}</td>
      <td className="hide-sm">{edu.degree}</td>
      <td className="hide-sm">
        {time(edu.from)} - {edu?.to ? time(edu.to) : "Now"}
      </td>
      <td>
        <button
          onClick={() => dispatch(deleteEducation(edu._id))}
          className="btn btn-danger">
          <i className="fa-solid fa-trash fa-lg"></i>
        </button>
      </td>
    </tr>
  ));
  return (
    <>
      <h2 className="my-2">Education Credentials</h2>
      <table className="table">
        <thead>
          <tr>
            <th>School</th>
            <th className="hide-sm">Degree</th>
            <th className="hide-sm">Years</th>
            <th></th>
          </tr>
        </thead>
        <tbody>{educations}</tbody>
      </table>
    </>
  );
};

export default Education;
