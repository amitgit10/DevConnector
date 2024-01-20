import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addOrUpdateEducation } from "../../slices/profileSlice";
import { useDispatch } from "react-redux";

const AddEducation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    school: "",
    degree: "",
    fieldofstudy: "",
    to: "",
    current: false,
    description: "",
    from: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { school, degree, fieldofstudy, from, to, current, description } =
    formData;

  const handleOnChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addOrUpdateEducation(formData, navigate));
  };
  return (
    <>
      <h1 className="large text-primary">Add Your Education</h1>
      <p className="lead">
        <i className="fas fa-graduation-cap"></i> Add any school, bootcamp, etc
        that you have attended
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* School or Bootcamp"
            name="school"
            required
            value={school}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Degree or Certificate"
            name="degree"
            required
            value={degree}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Field Of Study"
            name="fieldofstudy"
            value={fieldofstudy}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="form-group">
          <h4>From Date</h4>
          <input
            type="date"
            name="from"
            value={from}
            onChange={(e) => handleOnChange(e)}
          />
        </div>

        <div className="form-group">
          <p>
            <input
              type="checkbox"
              name="current"
              value={current}
              checked={current}
              onChange={() => {
                setFormData({ ...formData, current: !current });
                toggleDisabled(!toDateDisabled);
              }}
            />{" "}
            Current School
          </p>
        </div>
        <div className="form-group">
          <h4>To Date</h4>
          <input
            type="date"
            name="to"
            value={toDateDisabled ? "" : to}
            disabled={toDateDisabled}
            onChange={(e) => handleOnChange(e)}
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            cols="30"
            rows="5"
            placeholder="Program Description"
            value={description}
            onChange={(e) => handleOnChange(e)}></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </>
  );
};

export default AddEducation;
