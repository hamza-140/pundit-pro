import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const Project = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({ });

  useEffect(() => {
    const url = `/api/v1/show/${params.id}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setProject(response))
      .catch(() => navigate("/projects"));
  }, [params.id]);

  return (
    <div className="">
      <div className="hero position-relative d-flex align-items-center justify-content-center">
        <div className="overlay bg-dark position-absolute" />
        <h1 className="display-4 position-relative text-white">
          {project.name}
        </h1>
      </div>
      <div className="container py-5">
        <Link to="/projects" className="btn btn-link">
          Back to Projects
        </Link>
      </div>
    </div>
  );
};

export default Project;