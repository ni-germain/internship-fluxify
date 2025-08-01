// src/components/About.js
import React from 'react';

function About() {
  return (
    <section id="about" className="about container">
      <h2>About Me</h2>
      <p>I am a frontend developer specializing in React.js and building clean, user-friendly interfaces.</p>
      <h3>Skills</h3>
      <ul className="skills-list">
        <li>JavaScript (ES6+)</li>
        <li>React.js & Hooks</li>
        <li>HTML5 & CSS3</li>
        <li>Responsive Design</li>
        <li>Git & GitHub</li>
      </ul>
    </section>
  );
}

export default About;
