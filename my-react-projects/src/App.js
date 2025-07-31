// src/App.js
import './App.css';
import React, { useState } from 'react';

import Header from './components/header';
import Hero from './components/hero';
import About from './components/about';
import Projects from './components/projects';
import Contact from './components/contact';
import Footer from './components/footer';

function App() {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  const projectsData = [
    {
      id: 1,
      title: "Portfolio Website",
      description: "A personal portfolio built with React.",
      link: "https://github.com/ni-germain/portfolio"
    },
    {
      id: 2,
      title: "Weather App",
      description: "Shows weather forecast using OpenWeatherMap API.",
      link: "https://github.com/yourusername/weather-app"
    },
    // Add more projects as you like
  ];

  return (
    <div className={`app ${theme}`}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <main>
        <Hero />
        <About />
        <Projects projects={projectsData} />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;
