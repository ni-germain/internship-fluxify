// src/components/Header.js
import React from 'react';

function Header({ theme, toggleTheme }) {
  return (
    <header className={`header ${theme}`}>
      <nav className="nav container">
        <h1 className="logo">MyPortfolio</h1>
        <ul className="nav-links">
          <li><a href="#hero">Home</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#projects">Projects</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <button onClick={toggleTheme} className="theme-btn">
          {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
        </button>
      </nav>
    </header>
  );
}

export default Header;
