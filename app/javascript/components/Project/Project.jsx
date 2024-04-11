import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

const Project = () => {
  const params = useParams();
  const [project, setProject] = useState({});
  const [bugs, setBugs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [userNames, setUserNames] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/v1/show/${params.id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setProject(data.project);
        setBugs(data.bugs);
        setUserNames(data.users.map((user) => user.email).join(", "));
      } catch (error) {
        console.error("Error fetching project:", error);
        setErrorMessage("Error fetching project details.");
      }
    };
    fetchProject()

   
  }, [params.id]);

  return (
    <div className="container py-5">
      {errorMessage && (
        <div className="alert alert-danger" role="alert">
          {errorMessage}
        </div>
      )}
      <div className="d-flex justify-content-center align-items-center">
        <h1>Project Details</h1>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Project Name:
          </label>
          <input
            readOnly
            className="form-control"
            id="name"
            aria-describedby="name"
            value={project.name}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Project Description:
          </label>
          <input
            readOnly
            className="form-control"
            id="description"
            aria-describedby="description"
            value={project.description}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="project_users" className="form-label">
            Project Users:
          </label>
          <input
            readOnly
            className="form-control"
            id="project_users"
            aria-describedby="project_users"
            value={userNames}
          />
        </div>
        
        <h4>List of Bugs:</h4>
        <div id="searchResults">
          <table className="table">
            <thead>
              <tr>
                <th>Bug Name</th>
                <th>Bug Status</th>
                <th>Bug Type</th>
              </tr>
            </thead>
            <tbody>
              {bugs.map((bug) => (
                <tr key={bug.id} className="projectRow">
                  <td>
                    <Link
                      to={`/project/${project.id}/bug/${bug.id}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      {bug.title}
                    </Link>
                  </td>
                  <td>{bug.status}</td>
                  <td>{bug.bug_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Link
          to={`/project/${params.id}/bug/new`}
          className="btn btn-outline-warning mx-2 text-nowrap"
          style={{ marginRight: "10px" }}
        >
          New Bug
        </Link>
        <Link
          to={`/project/${project.id}/edit`}
          className="btn btn-outline-success mx-2 text-nowrap"
          style={{ marginRight: "10px" }}
        >
          Edit Project
        </Link>
        <Link to="/projects" className="btn btn-primary">
          Back to Projects
        </Link>
      </form>
    </div>
  );
};

export default Project;
