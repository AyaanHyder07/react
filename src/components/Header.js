import React from 'react';
import './Header.css';

function Header() {
  return (
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
  );
}

export default Header;
