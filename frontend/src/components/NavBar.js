// NavBar.js
import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './NavBar.css'; // Make sure the path is correct

const NavBar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          LOGO
        </NavLink>
        <div className="nav-menu-button" onClick={toggleMobileMenu}>
          ☰
        </div>
        <ul className={`nav-menu ${isMobileMenuOpen ? 'nav-menu-active' : ''}`}>
          <li className="nav-item">
            <NavLink to="/" className="nav-links" onClick={() => setIsMobileMenuOpen(false)}>
              Главная
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/news" className="nav-links" onClick={() => setIsMobileMenuOpen(false)}>
              Новости
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/login" className="nav-links" onClick={() => setIsMobileMenuOpen(false)}>
              Вход
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/register" className="nav-links" onClick={() => setIsMobileMenuOpen(false)}>
              Регистрация
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/news/create" className="nav-links" onClick={() => setIsMobileMenuOpen(false)}>
              Создать
            </NavLink>
          </li>
          <li className="nav-item search-item">
            <form onSubmit={handleSearch} className="nav-search-form">
              <input
                type="text"
                className="nav-search-input"
                placeholder="Поиск..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button type="submit" className="nav-search-button">Поиск</button>
            </form>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
