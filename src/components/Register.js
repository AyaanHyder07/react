import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { register } from "../services/apiService"; // Import the updated register function
import "./LoginPortal.css";

function Register() {
  const [activeForm, setActiveForm] = useState("student");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rgNo, setRgNo] = useState("");
  const [staffRole, setStaffRole] = useState(""); // ✅ ADD state for the staff role
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // ✅ FIX: Build a payload object to send to the backend
    const payload = {
      name,
      email,
      password,
      role: activeForm.toUpperCase(), // "STUDENT" or "STAFF"
      rgNo: activeForm === 'student' ? rgNo : null,
      staffRole: activeForm === 'staff' ? staffRole : null
    };
    
    try {
      const response = await register(payload); // Send the single payload object

      if (response.data.token) {
        localStorage.setItem('user_token', JSON.stringify(response.data.token));
      }
      
       navigate("/dashboard");  
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Registration failed. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const renderForm = () => (
    <form onSubmit={handleRegister}>
      <div className="form-group">
        <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} required />
      </div>
      <div className="form-group">
        <input type="email" placeholder="Email Address" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </div>

      {/* ✅ ADD conditional field for Student */}
      {activeForm === 'student' && (
        <div className="form-group">
          <input type="text" placeholder="Registration No." value={rgNo} onChange={(e) => setRgNo(e.target.value)} required />
        </div>
      )}

      {/* ✅ ADD conditional field for Staff */}
      {activeForm === 'staff' && (
        <div className="form-group">
          <input type="text" placeholder="Staff Role (e.g., Professor)" value={staffRole} onChange={(e) => setStaffRole(e.target.value)} required />
        </div>
      )}

      <div className="form-group">
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="btn" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
      <div className="links">
        <Link to="/login" className="link-btn">Already have an account? Login</Link>
      </div>
    </form>
  );

  return (
    <div className="login-page">
      <div className="login-box">
        <img src="https://akm-img-a-in.tosshub.com/sites/resources/campus/prod/img/logo/1442085977843.png" alt="College Logo" className="logo" />
        <h2 className="title">New Registration</h2>
        <p className="subtitle">Create a new Student or Staff account</p>
        
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

export default Register;  