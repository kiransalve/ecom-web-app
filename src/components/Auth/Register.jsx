import React, { useState } from "react";
import "../../css/Auth.css";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {

  const firebaseAuth = "AIzaSyDlcK8Kognh40O6xXIyPE_uOBAUIBlxNkE"
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    try {
  const signup = async () => {
        try {
          const response = await fetch(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${firebaseAuth}`
          ,  {
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
            console.log("Registration Failed");
            return;
          }
          const data = await response.json();
          console.log(data, "User Registered Successfully");
          navigate("/login");
        } catch (error) {
          console.error("Error:", error);
        }
      };
      signup();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="auth-form">
      <h2>Register</h2>
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
          <button type="submit">Register</button>
        </div>
      </form>
      Already have account, <Link to="/login">Login</Link>
    </div>
  );
};

export default Register;
