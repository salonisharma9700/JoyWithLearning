import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../cssfiles/Footer.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="navbar-container">
      <div className="navbar">
        <Link to="/" className="nav-logo" onClick={closeMenu}>
          <img src="images/family.png" className="family" alt="JoyWithLearning Logo" />
          <h4 className="mb-1">JoyWithLearning</h4>
        </Link>
        <div className={`nav-content ${isOpen ? 'open' : ''}`}>
          <Link to="/" className="nav-link" onClick={closeMenu}><strong>Home</strong></Link>
          <Link to="/about" className="nav-link" onClick={closeMenu}><strong>About</strong></Link>
          <Link to="/ytvid" className="nav-link" onClick={closeMenu}><strong>KnowMore</strong></Link>
          <Link to="/upvid" className="nav-link" onClick={closeMenu}><strong>Upload</strong></Link>
          <Link to="/faq" className="nav-link" onClick={closeMenu}><strong>FAQs</strong></Link>
          <Link to="/contact" className="nav-link" onClick={closeMenu}><strong>Contact</strong></Link>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          ☰
        </div>
      </div>
    </div>
  );
}

export default Navbar;
