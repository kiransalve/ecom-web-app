import React, { useState } from "react";
import "../../css/Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { saveUser } from "../../store/authReducer";
import { useDispatch } from "react-redux";

const Signin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    try {
      const login = async () => {
        try {
          const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FirebaseAuthKey}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: formData.email,
                password: formData.password,
                returnSecureToken: true,
              }),
            }
          );

          if (!response.ok) {
            console.log("Login Failed");
            return;
          }
          const data = await response.json();
          console.log(data, "User Logged in Successfully");
          navigate("/home");
          dispatch(saveUser(data));
        } catch (error) {
          console.error("Error:", error);
        }
      };
      login();
    } catch (error) {
      console.log(error);
    }
  };

  const handleGuestLogin = () => {
    try {
      const login = async () => {
        try {
          const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_FirebaseAuthKey}`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: "test1@gmail.com",
                password: "123456",
                returnSecureToken: true,
              }),
            }
          );

          if (!response.ok) {
            console.log("Login Failed");
            return;
          }
          const data = await response.json();
          console.log(data, "User Logged in Successfully");
          navigate("/home");
          dispatch(saveUser(data));
        } catch (error) {
          console.error("Error:", error);
        }
      };
      login();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-form">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            placeholder="Email"
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <input
            placeholder="Password"
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
      <button className="guestLogin" onClick={() => handleGuestLogin()}>
        Guest Login
      </button>
      <p>
        Not have account, <Link to="/register">Register</Link>
      </p>
    </div>
  );
};

export default Signin;
