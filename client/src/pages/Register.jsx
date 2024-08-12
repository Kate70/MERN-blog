import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';


import axios from "axios"

const Register = () => {
  console.log(`${process.env.REACT_APP_BASE_URL}/users/register`);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const [error, setError] = useState('');
  const navigate = useNavigate()

  const changeInputHandle = (e) => {
    setUserData((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };
  const registerUser = async (e) => {
    e.preventDefault()
    setError("")
   
    
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/users/register`, userData);
      const newUser = await response.data;
      console.log(newUser);
      if (!newUser) {
        setError("Couldn't register user. Please try again.")
      }
      navigate('/')
      
    } catch (err) {
      setError(err.response.data.message)
    }
}

  return (
    <section className="register">
      <div className="container">
        <h2>Sign Up</h2>
        <form className="form register__form" onSubmit={registerUser}>
        {error&& <p className="form__error-message">{error}</p>}  
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
