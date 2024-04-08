import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Bug = () => {
  const params = useParams();
  const [project, setProject] = useState({});
  const [bug, setBug] = useState([]);

  useEffect(() => {
    console.log(params);
    const fetchProject = async () => {
      try {
        // /api/v1/projects/:project_id/bug/:id
        const response = await fetch(`/api/v1/project/${params.project_id}/bug/${params.bug_id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        // setProject(data.project);
        setBug(data);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [params.id]);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center align-items-center">
        <h1>Bug Details</h1>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Bug Title:
          </label>
          <input
            readOnly
            className="form-control"
            id="name"
            aria-describedby="name"
            value={bug.title}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Bug Description:
          </label>
          <input
            readOnly
            className="form-control"
            id="description"
            aria-describedby="description"
            value={bug.description}
          />
        </div>
        <Link
          to={`/project/${bug.project_id}/bug/${bug.id}/edit`}
          className="btn btn-outline-success text-nowrap"
          style={{ marginRight: "10px" }}
        >
          Edit Bug
        </Link>
        <Link to={`/project/${bug.project_id}`} className="btn btn-primary">
          Return
        </Link>
      </form>
    </div>
  );
};

export default Bug;
