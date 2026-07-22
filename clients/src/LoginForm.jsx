import React, { useState } from "react";
import "./App.css";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ Email: "", Password: "" });
  const [errors, setErrors] = useState({ Email: "", Password: "" });
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const validationErrors = { Email: "", Password: "" };

    if (!form.Email) {
      validationErrors.email = "Email is required";
    }

    if (!form.Password) {
      validationErrors.password = "Password is required";
    } else if (form.Password.length < 6) {
      validationErrors.password = "Password must be at least 6 characters";
    }

    setErrors(validationErrors);
    return !validationErrors.Email && !validationErrors.Password;
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }
    navigate("/notes");
    setLoading(true);

    try {
      console.log(form);
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert(data.message);
        navigate("/notes");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="Login-container">
      <form onSubmit={handleLogin} autoComplete="off">
        <div className="form-container">
          <div>
            <h2 style={{ color: "#263C5C" }}>Login</h2>
            <input
              name="Email"
              type="email"
              autoComplete="off"
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
            {errors.email && (
              <div style={{ color: "red", marginBottom: "8px" }}>
                {errors.email}
              </div>
            )}
            <input
              name="Password"
              type="password"
              autoComplete="off"
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
            {errors.password && (
              <div style={{ color: "red", marginBottom: "8px" }}>
                {errors.Password}
              </div>
            )}
            <a
              href="/"
              style={{
                color: "#3174c1",
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: "5px",
                textDecoration: "none",
              }}
            >
              Forgot a password?
            </a>
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
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
