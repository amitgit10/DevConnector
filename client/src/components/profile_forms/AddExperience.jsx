import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { addOrUpdateExperience } from "../../slices/profileSlice";
import { useDispatch } from "react-redux";

const AddExperience = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    company: "",
    title: "",
    location: "",
    to: "",
    current: false,
    description: "",
    from: "",
  });

  const [toDateDisabled, toggleDisabled] = useState(false);

  const { title, company, from, location, to, current, description } = formData;

  const handleOnChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(addOrUpdateExperience(formData, navigate));
  };
  return (
    <section className="container">
      <h1 className="large text-primary">Add An Experience</h1>
      <p className="lead">
        <i className="fas fa-code-branch"></i> Add any developer/programming
        positions that you have had in the past
      </p>
      <small>* = required field</small>
      <form className="form" onSubmit={(e) => onSubmit(e)}>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Job Title"
            name="title"
            value={title}
            onChange={(e) => handleOnChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="* Company"
            name="company"
            value={company}
            onChange={(e) => handleOnChange(e)}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            placeholder="Location"
            name="location"
            value={location}
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
          <input
            type="checkbox"
            name="current"
            value={current}
            checked={current}
            onChange={() => {
              setFormData({ ...formData, current: !current });
              toggleDisabled(!toDateDisabled);
            }}
          />
          <span className="px-1" style={{ fontSize: "18px" }}>
            Current Job
          </span>
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
            placeholder="Job Description"
            value={description}
            onChange={(e) => handleOnChange(e)}></textarea>
        </div>
        <input type="submit" className="btn btn-primary my-1" />
        <Link className="btn my-1" to="/dashboard">
          Go Back
        </Link>
      </form>
    </section>
  );
};

export default AddExperience;
