import React from "react";
import { Link, useNavigate } from "react-router-dom";

const ProjectList = ({ projects, editProjectPath }) => {
  const navigate = useNavigate();

  const deleteProject = (id) => {
    const url = `/api/v1/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => navigate("/"))
      .catch((error) => console.log(error.message));
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this project?"
    );
    if (confirmDelete) {
      deleteProject(id);
    }
  };

  return (
    <div>
      <h4>List of Projects:</h4>
      <div id="searchResults">
        <table className="table">
          <thead>
            <tr>
              <th>Project Name</th>
              <th style={{ textAlign: "center" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan="2" style={{ textAlign: "center" }}>
                  No projects found. Add a new project.
                </td>
              </tr>
            ) : (
              projects.map((project, index) => (
                <tr key={index}>
                  <td>{project.name}</td>
                  <td style={{ textAlign: "center" }}>
                    <Link
                      to={`/project/${project.id}`}
                      style={{ marginRight: "10px" }}
                    >
                      <i
                        className="bi bi-eye-fill"
                        style={{ color: "green", fontSize: "20px" }}
                      ></i>
                    </Link>
                    <Link
                      to={editProjectPath(project.id)}
                      style={{ marginRight: "10px" }}
                    >
                      <i
                        className="bi bi-pencil-square"
                        style={{ color: "orange", fontSize: "20px" ,marginLeft:"50px",marginRight:"50px"}}
                      ></i>
                    </Link>
                    <button
                      style={{
                        border: "none",
                        backgroundColor: "transparent",
                        marginRight: "10px",
                      }}
                      onClick={() => handleDelete(project.id)}
                    >
                      <i
                        className="bi bi-trash"
                        style={{ color: "red", fontSize: "20px" }}
                      ></i>
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProjectList;
