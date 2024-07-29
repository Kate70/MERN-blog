import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const changeInputHandle = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form">
          <p className="form__error-message">This is an error message</p>
          <input
            type="text"
            placeholder="Full Name"
            name="name"
            value={userData.name}
            onChange={changeInputHandle}
          />
          <input
            type="text"
            placeholder="email"
            name="email"
            value={userData.email}
            onChange={changeInputHandle}
          />
          <input
            type="text"
            placeholder="password"
            name="password"
            value={userData.password}
            onChange={changeInputHandle}
          />
          <input
            type="text"
            placeholder="Confirm password" 
            name="password2"
            value={userData.password2}
            onChange={changeInputHandle}
          />
          <button type="submit" className="btn primary">Register</button>
        </form>
        <small>Already have ab accaunt?<Link to="/login">Sign in</Link></small>
      </div>
    </section>
  );
};

export default Register;
