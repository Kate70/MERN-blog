import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../img/logo.png';
import { HiMiniBars3 } from "react-icons/hi2";
import { IoClose } from "react-icons/io5";

const Header = () => {
  const [isNavShowing, setIsNavShowing]= useState(window.innerWidth > 800?true:false)
  const closeNavHandle = () => {
    if (window.innerWidth < 800) {
     setIsNavShowing(false)
    } else {
      setIsNavShowing(true)
   }
 }
 
  return (
    <nav>
      <div className="container nav__container">
        <Link to="/" className="nav__logo"  onClick={closeNavHandle}>
        <img src ={Logo}/>
        </Link>
        {isNavShowing && <ul className="nav__menu">
          <li><Link to="/profile/iib" onClick={closeNavHandle}>Ernest Achiever</Link></li>
          <li><Link to="/create"  onClick={closeNavHandle}>Create Post</Link></li>
          <li><Link to="/authors"  onClick={closeNavHandle}>Authors</Link></li>
          <li><Link to="/logout"  onClick={closeNavHandle}>Logout</Link></li>
        </ul>}
       
        <button className="nav__toggle-btn" onClick={()=> setIsNavShowing(!isNavShowing)}>
          {
            isNavShowing ? <IoClose />:< HiMiniBars3 />
          }
        </button>
      </div>
    </nav>
  );
};

export default Header;