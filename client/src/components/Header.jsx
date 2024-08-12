import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "../img/logo.png";
import { HiMiniBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";
import { UserContext } from "../context/userContext";
import axios from "axios";

const Header = () => {
  const [isNavShowing, setIsNavShowing] = useState(
    window.innerWidth > 800 ? true : false
  );
  const { currentUser } = useContext(UserContext);

  const closeNavHandle = () => {
    if (window.innerWidth < 800) {
      setIsNavShowing(false);
    } else {
      setIsNavShowing(true);
    }
  };

  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo" onClick={closeNavHandle}>
          <img src={Logo} />
        </Link>
        {currentUser?.id && isNavShowing && (
          <ul className="nav__menu">
            <li>
              <Link to={`/profile/${currentUser.id}`} onClick={closeNavHandle}>
                {currentUser?.name}
              </Link>
            </li>
            <li>
              <Link to="/create" onClick={closeNavHandle}>
                Create Post
              </Link>
            </li>
            <li>
              <Link to="/authors" onClick={closeNavHandle}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/logout" onClick={closeNavHandle}>
                Logout
              </Link>
            </li>
          </ul>
        )}

        {!currentUser?.id && isNavShowing && (
          <ul className="nav__menu">
            <li>
              <Link to="/authors" onClick={closeNavHandle}>
                Authors
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={closeNavHandle}>
                Login
              </Link>
            </li>
          </ul>
        )}

        <button
          className="nav__toggle-btn"
          onClick={() => setIsNavShowing(!isNavShowing)}
        >
          {isNavShowing ? <IoClose /> : <HiMiniBars3 />}
        </button>
      </div>
    </nav>
  );
};

export default Header;
