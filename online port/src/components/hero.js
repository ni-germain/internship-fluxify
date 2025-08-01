// src/components/Hero.js
import React from 'react';

function Hero() {
  return (
    <section id="hero" className="hero container">
      <h2>Hello, I'm <span className="name">NIYONKURU Germain</span></h2>
      <p>A passionate React developer building beautiful web apps.</p>
      <a href="#projects" className="btn-primary">See My Work</a>
    </section>
  );
}

export default Hero;
