import React from "react";
import "../styles/Main.css";

const Main = () => (
  <section className="hero">
    <div className="hero-content">
      <div className="hero-text">
        <section className="welcome">
          <h2>Welcome to Government Polytechnic</h2>
          <p>
            We are committed to delivering quality technical education and skill development
            to empower our students for a brighter tomorrow. Our goal is to nurture talent,
            innovation, and character.
          </p>
          <a href="LOGIN.HTML" className="hero-button">Get Started</a>
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
);

export default Main;
