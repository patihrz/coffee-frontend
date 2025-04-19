import React from 'react';
import '../styles/Footer.css';
import { FaFacebook, FaInstagram, FaTwitter, FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
        <h4>Tentang Kami</h4>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/career">Career</a></li>
            <li><a href="/carapesan">Cara Pesan</a></li>
          </ul>
        </div>


        <div className="footer-section">
          <h4>Kontak</h4>
          <ul>
            <li><FaEnvelope className="footer-icon" /> cs@trikecoffee.id</li>
            <li><FaPhoneAlt className="footer-icon" /> +62 812 3456 7890</li>
            <li><FaMapMarkerAlt className="footer-icon" /> Bandung, Indonesia</li>
          </ul>
        </div>


        <div className="footer-section">
          <h4>Ikuti Kami</h4>
          <div className="social-icons">
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>


        <div className="footer-certification">
          <img src="/images/iso.png" alt="ISO" />
          <img src="/images/halal.png" alt="Halal" />
        </div>
      </div>

      <div className="footer-bottom">
        &copy; {new Date().getFullYear()} Trike Coffee. By Patih Ramadika
      </div>
    </footer>
  );
};

export default Footer;
