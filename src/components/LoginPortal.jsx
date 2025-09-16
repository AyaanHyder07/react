import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/apiService";
import "./LoginPortal.css";

function LoginPortal() {
  const [activeForm, setActiveForm] = useState("student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard"); 

    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed. Please check your credentials.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => (
    <form onSubmit={handleLogin}>
      <div className="form-group">
        <input type="email" placeholder={`${activeForm === "student" ? "Student" : "Staff"} Email`} value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>
      <div className="form-group">
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="btn" disabled={loading}>{loading ? "Logging in..." : "Login"}</button>
      <div className="links">
        <Link to="/register" className="link-btn">New Registration</Link>
        <button type="button" className="link-btn">Forgot Password?</button>
      </div>
    </form>
  );

  return (
    <div className="login-page">
      <div className="login-box">
        <img src="https://akm-img-a-in.tosshub.com/sites/resources/campus/prod/img/logo/1442085977843.png" alt="College Logo" className="logo" />
        <h2 className="title">Login Portal</h2>
        <p className="subtitle">Student & Staff Login Portal</p>
        {error && <div className="error-message">{error}</div>}
        <div className="tab-buttons">
          <button className={activeForm === "student" ? "active" : ""} onClick={() => setActiveForm("student")}>Student</button>
          <button className={activeForm === "staff" ? "active" : ""} onClick={() => setActiveForm("staff")}>Staff</button>
        </div>
        {renderForm()}
      </div>
    </div>
  );
}
export default LoginPortal;