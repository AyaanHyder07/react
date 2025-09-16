import React from "react";
import "./CollegeLandingPage.css";
import { Link } from "react-router-dom";

const CollegeLandingPage = () => (
  <>
    {/* Header */}
    <header>
      <div className="logo-container">
        <img
          src="https://akm-img-a-in.tosshub.com/sites/resources/campus/prod/img/logo/1442085977843.png"
          alt="College Logo"
          className="logo"
        />
        <div className="college-name">Government Polytechnic Kalaburgi</div>
      </div>
    </header>

    {/* Navigation */}
    <nav>
      <div className="nav-links">
        <a href="#">Home</a>
        <a href="#">About Us</a>
        <a href="#">Placement</a>
        <a href="#">Exam</a>
        <a href="#">Admissions</a>
        <a href="#">Contact</a>
      </div>
      <Link to="/login" className="login-btn">
        Login
      </Link>
    </nav>

    {/* Slogan */}
    <div className="slogan">
      "Empowering Minds, Shaping the Future"
    </div>

    {/* Main */}
    <main>
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <section className="welcome">
              <h2>Welcome to Government Polytechnic</h2>
              <p>
                We are committed to delivering quality technical education and
                skill development to empower our students for a brighter
                tomorrow. Our goal is to nurture talent, innovation, and
                character.
              </p>
              <Link to="/login" className="hero-button">
                Get Started
              </Link>
            </section>
          </div>
          <div className="hero-image">
            <img
              src="https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&w=800&q=80"
              alt="Education"
            />
          </div>
        </div>
      </section>
    </main>

    {/* Footer */}
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-column">
          <h4>Get to Know Us</h4>
          <a href="/about">About College</a>
          <a href="/principal-message">Principal’s Message</a>
          <a href="/affiliation">Affiliations</a>
        </div>
        <div className="footer-column">
          <h4>Academics</h4>
          <a href="/admissions">Admissions</a>
          <a href="/departments">Departments</a>
          <a href="/exam-info">Examination Info</a>
        </div>
        <div className="footer-column">
          <h4>Student Resources</h4>
          <a href="/placements">Placement Cell</a>
          <a href="/notices">Notices</a>
          <a href="/downloads">Downloads</a>
        </div>
        <div className="footer-column">
          <h4>Connect with Us</h4>
          <a href="mailto:info@govpolytechnic.edu.in">
            info@govpolytechnic.edu.in
          </a>
          <a href="tel:+911234567890">+91-12345-67890</a>
          <a href="/contact">Contact Form</a>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2025 Government Polytechnic College. All rights reserved. | Last
        updated: September 2025
      </div>
    </footer>
  </>
);

export default CollegeLandingPage;
