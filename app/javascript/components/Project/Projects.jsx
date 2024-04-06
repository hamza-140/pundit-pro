import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Projects = () => {
  const navigate = useNavigate();
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const url = "/api/v1/projects/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => setProjects(res))
      .catch(() => navigate("/"));
  }, []);

  const allProjects = projects.map((project, index) => (
    <div key={index} className="col-md-6 col-lg-4">
      <div className="card mb-4">
        <div className="card-body">
          <h5 className="card-title">{project.name}</h5>
          <Link to={`/project/${project.id}`} className="btn custom-button">
            View Project
          </Link>
        </div>
      </div>
    </div>
  ));
  const noProject = (
    <div className="vw-100 vh-50 d-flex align-items-center justify-content-center">
      <h4>
        No projects yet.
      </h4>
    </div>
  );

  return (
    <>
      <div className="py-5">
        <main className="container">
          <div className="row">
            {projects.length > 0 ? allProjects : noProject}
          </div>
        </main>
      </div>
    </>
  );
};

export default Projects;