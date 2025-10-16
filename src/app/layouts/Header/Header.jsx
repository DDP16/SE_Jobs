import React from "react";
import "./Header.css";
import logo from '../../assets/logo.svg';


export default function Header() {
  return (
    <header className="app-header">
      <div className="header-container">
        <div className="logo" onClick={() => navigate('/')}>
          <img src={logo} alt="SE Jobs Logo" width="70" />
        </div>

        <nav className="nav" aria-label="Main navigation">
          <a className="nav-link active" href="#" aria-current="page">Home</a>
          <a className="nav-link" href="#jobs">Jobs</a>
          <a className="nav-link" href="#contact">Contact Us</a>
        </nav>

        <div className="header-right">
          <a className="right-link" href="#employers" style={{ fontStyle: 'italic' }}>For Employers</a>
          <a className="right-link" href="#login">Login</a>
          <button className="btn register">Register</button>
          <div className="lang-toggle">EN<span className="sep">|</span>VI</div>
        </div>
      </div>
    </header>
  );
}
