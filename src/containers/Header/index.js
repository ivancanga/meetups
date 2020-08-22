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
          {props.auth.isAuth && (
            <div className="user_info">
              <li className="user_info__name">
                <b>{props.auth.dataUser.name}</b>
              </li>
              <li>
                <a className="logout" href="/"></a>
              </li>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Header;
