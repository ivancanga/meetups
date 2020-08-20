import React from "react";
import { Link } from "react-router-dom";

import "./index.scss";

function Header(props) {
  return (
    <header>
      <nav>
        <div className="nav-container">
          <div className="nav-container__logo">
            <Link to={"/"}>
              <div className="logo" />
              <h1>Meetupbeers</h1>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Header;
