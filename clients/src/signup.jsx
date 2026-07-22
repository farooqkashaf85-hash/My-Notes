import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    Username: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const [error, setError] = useState({
    Username: "",
    Email: "",
    Password: "",
    ConfirmPassword: "",
  });
  const validate = () => {
    const validateErrors = {
      Username: "",
      Email: "",
      Password: "",
      ConfirmPassword: "",
    };
    if (!form.Username) {
      validateErrors.Username = "Please enter Username";
    }
    if (!form.Email) {
      validateErrors.Email = "Please enter Email";
    }
    if (!form.Password) {
      validateErrors.Password = "Please enter Password";
    }
    if (!form.ConfirmPassword) {
      validateErrors.ConfirmPassword = "Please Confirm Password";
    } else if (form.Password.length < 6) {
      validateErrors.Password = "Password must be at least 6 characters";
    }
    setError(validateErrors);
    return (
      !validateErrors.Username &&
      !validateErrors.Email &&
      !validateErrors.Password &&
      !validateErrors.ConfirmPassword
    );
  };
  const handleInput = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) {
      alert("please fill all data");
      return;
    }
    setLoading(true);
    try {
      console.log(form);
      const response = await fetch("http://localhost:5000/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert(data.message);
        navigate("/login");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
      alert("server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Login-container">
      <form onSubmit={handleSubmit}>
        <div className="form-container">
          <h2 style={{ color: "#263C5C" }}>Signup</h2>
          <input
            name="Username"
            type="text"
            value={form.Username}
            onChange={handleInput}
            style={{
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #CCCCCC",
              backgroundColor: "#F0F0F0",
              width: "100%",
            }}
            placeholder="Enter Username"
          />
          {error.Username && (
            <div style={{ color: "red", marginBottom: "8px" }}>
              {error.Username}
            </div>
          )}
          <input
            name="Email"
            type="email"
            value={form.Email}
            onChange={handleInput}
            style={{
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #CCCCCC",
              backgroundColor: "#F0F0F0",
              width: "100%",
            }}
            placeholder="Enter Email"
          />
          {error.Email && (
            <div style={{ color: "red", marginBottom: "8px" }}>
              {error.Email}
            </div>
          )}
          <input
            name="Password"
            type="password"
            value={form.Password}
            onChange={handleInput}
            style={{
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #CCCCCC",
              backgroundColor: "#F0F0F0",
              width: "100%",
            }}
            placeholder="Enter Password"
          />
          {error.Password && (
            <div style={{ color: "red", marginBottom: "8px" }}>
              {error.Password}
            </div>
          )}
          <input
            name="ConfirmPassword"
            type="password"
            value={form.ConfirmPassword}
            onChange={handleInput}
            style={{
              marginBottom: "10px",
              borderRadius: "5px",
              border: "1px solid #CCCCCC",
              backgroundColor: "#F0F0F0",
              width: "100%",
            }}
            placeholder="Confirm Password"
          />
          {error.ConfirmPassword && (
            <div style={{ color: "red", marginBottom: "8px" }}>
              {error.ConfirmPassword}
            </div>
          )}
          <button
            type="submit"
            style={{
              backgroundColor: "#263C5C",
              color: "white",
              borderRadius: "5px",
              border: "none",
              padding: "10px",
              width: "100%",
            }}
          >
            Signup
          </button>
          <p
            style={{
              color: "#263C5C",
              display: "flex",
              justifyContent: "center",
              margin: "10px",
            }}
          >
            Alraedy a Member?
            <a
              href="/login"
              style={{ color: "#3174c1", textDecoration: "none" }}
            >
              Login now
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
