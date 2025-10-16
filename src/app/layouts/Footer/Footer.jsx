import React from "react";
import logo from "../../assets/logo.svg";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer_container">
        {/* top section */}
        <div className="footer_top">
          {/* Brand */}
          <div className="footer_brand">
            <div className="footer_brandRow">
              <img src={logo} alt="Jobs" width={60} height={60} />
            </div>
            <p className="footer_desc">
              Great platform for the job seeker that passionate about startups.
              Find your dream job easier.
            </p>
          </div>

          {/* About */}
          <nav aria-label="About">
            <h4 className="footer_title">About</h4>
            <ul className="footer_list">
              <li className="footer_item">
                <a href="#" className="footer_link">
                  Terms
                </a>
              </li>
              <li className="footer_item">
                <a href="#" className="footer_link">
                  Advice
                </a>
              </li>
              <li className="footer_item">
                <a href="#" className="footer_link">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </nav>

          {/* Resources */}
          <nav aria-label="Resources">
            <h4 className="footer_title">Resources</h4>
            <ul className="footer_list">
              <li className="footer_item">
                <a href="#" className="footer_link">
                  Help Docs
                </a>
              </li>
              <li className="footer_item">
                <a href="#" className="footer_link">
                  Guide
                </a>
              </li>
              <li className="footer_item">
                <a href="#" className="footer_link">
                  Updates
                </a>
              </li>
              <li className="footer_item">
                <a href="#" className="footer_link">
                  Contact Us
                </a>
              </li>
            </ul>
          </nav>

          {/* Subscribe */}
          <div className="footer_subscribe">
            <h4 className="footer_title">Get job notifications</h4>
            <p className="footer_hint">
              The latest job news, articles, sent to your inbox weekly.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="footer_form">
              <input
                type="email"
                aria-label="Email Address"
                placeholder="Email Address"
                className="footer_input"
              />
              <button type="submit" className="footer_btn">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* divider */}
        <div className="footer_divider" />

        {/* bottom bar */}
        <div className="footer_bottom">
          <small className="footer_copyright">
            2025© SE UIT. All rights reserved.
          </small>
          <div className="footer_socials">
            {[
              { label: "f", title: "Facebook" },
              { label: "ig", title: "Instagram" },
              { label: "dr", title: "Dribbble" },
              { label: "in", title: "LinkedIn" },
              { label: "tw", title: "Twitter" },
            ].map((icon) => (
              <a
                key={icon.title}
                href="#"
                aria-label={icon.title}
                title={icon.title}
                className="footer_social"
              >
                {icon.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
