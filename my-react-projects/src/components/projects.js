// src/components/Projects.js
import React from 'react';

function Projects({ projects }) {
  return (
    <section id="projects" className="projects container">
      <h2>My Projects</h2>
      <div className="project-grid">
        {projects.map(({ id, title, description, link }) => (
          <div key={id} className="project-card">
            <h3>{title}</h3>
            <p>{description}</p>
            <a href={link} target="_blank" rel="noopener noreferrer" className="btn-secondary">View</a>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;
