// components/Footer.js
import React from 'react';
import './Footer.css'; // Ссылка на файл стилей для Footer

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>© GameNews {new Date().getFullYear()}. Все права защищены.</p>
        <p>
          Следите за нами на:
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"> Twitter</a>,
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"> Facebook</a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
