import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import Logo from '../../assets/images/logo.png';
import './navbar.css';

const Header=({user,setUser})=>{
  const [open, setOpen] = useState(false);
	const handleClick = () => {
		setOpen(!open);
	};
	const closeMenu = () => {
		setOpen(false);
    document.querySelector('#checkbox_toggle').checked=false;
	};
  const logout =() =>{
    setUser(false);
  }
  const logoutBtn=()=>{
    closeMenu();
    logout();
  }

  return(
    <div className="Header">
      <Link to="/" className="logo">
        <img className="logo" src={Logo} alt="logo"/>
      </Link>
      {
        user?(
          <ul>
            <input type="checkbox" id="checkbox_toggle" onClick={handleClick}/>
            <label htmlFor="checkbox_toggle" className="check-menu">&#9776;</label>
            <div className='menu'>
              <li>
                <Link className="nav-link" to="/profile" onClick={closeMenu}>
                  Profile
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/game" onClick={closeMenu}>
                  Game
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/results" onClick={closeMenu}>
                  Results
                </Link>
              </li>
              <li>
                <Link className="nav-link" to="/" onClick={logoutBtn}>
                  Logout
                </Link>
              </li>
            </div>
          </ul>
        ):(
          <div className="right-nav">
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </div>
        )
      }
    </div>
  )
}

export default Header;