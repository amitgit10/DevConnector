import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { password, email } = formData;

  const handleOnChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    // Validate password
    if (!email || !password) {
      console.log("Please enter your valid credentials");
    } else {
      console.log(formData);
    }
  };

  return (
    <>
      <div className="alert alert-danger">Invalid Credentials</div>

      <h1 className="large text-primary">Sign In</h1>
      <p className="lead">
        <i className="fas fa-user"></i>Sign into your Account
      </p>
      <form onSubmit={(e) => onSubmit(e)} className="form">
        <div className="form-group">
          <input
            type="email"
            placeholder="Email Address"
            name="email"
            value={email}
            onChange={(e) => handleOnChange(e)}
            required
          />
          <small className="form-text">
            This site uses Gravatar, so if you want a profile image, use a
            Gravatar email
          </small>
        </div>
        <div className="form-group">
          <input
            type="password"
            placeholder="Password"
            minLength="6"
            name="password"
            value={password}
            onChange={(e) => handleOnChange(e)}
            required
          />
        </div>
        <input type="submit" value="Login" className="btn btn-primary" />
      </form>
      <p className="my-1">
        Don&apos;t have an account? <Link to="/register">Sign Up</Link>
      </p>
    </>
  );
};
