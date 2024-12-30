import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

import logo from '../assets/images/logo.png';
import '../css/Header.css';

const Header = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
     auth.onAuthStateChanged((user) => {
      console.log(user);
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });
  }, []);

  async function handleLogout() {
    try {
      await auth.signOut();
      window.localStorage.clear();
      navigate('/login');
      console.log("User logged out successfully!");
    } catch (error) {
      console.error("Error logging out:", error.message);
    }
  }

  return (
    <div>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
        <defs>
          <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop
              offset="0%"
              style={{ stopColor: '#59453c', stopOpacity: '1' }}
            />
            <stop
              offset="100%"
              style={{ stopColor: '#8f3a09', stopOpacity: '1' }}
            />
          </linearGradient>
        </defs>
        <path
          fill="url(#gradient)"
          d="M0,256L48,240C96,224,192,192,288,181.3C384,171,480,181,576,186.7C672,192,768,192,864,181.3C960,171,1056,149,1152,133.3C1248,117,1344,107,1392,101.3L1440,96L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        ></path>
      </svg>
      <Link to={'/'}>
        <div className='img-container'>
          <img src={logo} alt="Logo" className='img-format' />
          <span className='logo-name'>NextLevel Food</span>
        </div>
      </Link>
      <nav className='navbar-container'>
        <ul className='nav-menu'>
          <li className='menu-list'>
            <NavLink to="/create" style={{ textDecoration: "none", color: "inherit" }}>
              Add Recipe
            </NavLink>
          </li>
          <li className='menu-list'>
            <NavLink to="/listing" style={{ textDecoration: "none", color: "inherit" }}>
              Browse Meals
            </NavLink>
          </li>
          { isAuthenticated ? (
            <li className='menu-list'>
              <button onClick={handleLogout} style={{ textDecoration: "none", color: "inherit", background: "none", border: "none", cursor: "pointer",fontWeight:"800" }}>
                Logout
              </button>
            </li>
          ) : (
            <li className='menu-list'>
              <NavLink to="/login" style={{ textDecoration: "none", color: "inherit" }}>
                Login
              </NavLink>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
