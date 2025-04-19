import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";
import logo from '../assets/trike-coffe.png';

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
<Link
  to="/"
  className="logo-link"
  onClick={() => {
    setOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }}
>
  <img src={logo} alt="Trike Coffee" className="logo-img" />
</Link>


      <div className={`menu-toggle ${open ? "open" : ""}`} onClick={() => setOpen(!open)}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      <ul className={`nav-links ${open ? "show" : ""}`}>
        <li><a href="#menu" onClick={handleLinkClick}>Menu</a></li>
        <li><a href="#order" onClick={handleLinkClick}>Order</a></li>
        <li><a href="#partnership" onClick={handleLinkClick}>Partnership</a></li>
        <li><a href="#contact" onClick={handleLinkClick}>Contact</a></li>
      </ul>
    </motion.nav>
  );
};

export default Navbar;
