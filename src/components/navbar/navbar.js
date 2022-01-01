import React,{useState,useEffect,useRef} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import './navbar.css';

const Header=({user})=>{

  return(
    <div className="Header">
      <Link to="/" className="logo">
        <img className="logo" src={Logo} alt="logo"/>
      </Link>
      {
        user?(
          <ul>
            <input type="checkbox" id="checkbox_toggle" />
            <label htmlFor="checkbox_toggle" className="check-menu">&#9776;</label>
            <div className="menu">
              <li>
                <Link className="link" to="/profile">
                  Profile
                </Link>
              </li>
              <li>
                <Link className="link" to="/game">
                  Game
                </Link>
              </li>
              <li>
                <Link className="link" to="/results">
                  Results
                </Link>
              </li>
              <li>
                <span className="link">
                  Logout
                </span>
              </li>
            </div>
          </ul>
        ):(
          <div className="right-nav">
            <Link className="link" to="/login">
              Login
            </Link>
          </div>
        )
      }
    </div>
  )
}

export default Header;