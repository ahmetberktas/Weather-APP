import React from 'react';
import './Footer.scss';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footerContainer">
        <p className="footerText">
          Weather App &copy; 2023. All Rights Reserved.
        </p>
        <p className="footerText">AHMET BERKTAS</p>
      </div>
    </footer>
  );
};

export default Footer;