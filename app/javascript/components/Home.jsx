import React, { useEffect, useState } from 'react';

function ProjectList() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    fetch('/api/v1/projects')
      .then(response => response.json())
      .then(data => setProjects(data))
      .catch(error => console.error('Error fetching projects:', error));
  }, []);

  return (
    <div>
      <h1>Projects</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id}>
            <a href={`/projects/${project.id}`}>{project.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProjectList;
