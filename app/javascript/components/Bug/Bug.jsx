import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Bug = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [bug, setBug] = useState([]);
  useEffect(() => {
    fetch(`/api/v1/project/${params.project_id}/bug/${params.bug_id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setBug(res);
      })
      .catch(() => navigate(`/project/${params.project_id}`));
  }, [navigate]);
// Adjusted dependency array

  const deleteBug = (id) => {
    const url = `/api/v1/project/${params.project_id}/bug/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then(() => navigate(`/project/${params.project_id}`)) // Redirect to project page
      .catch((error) => console.log(error.message));
  };

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
        >
          Edit Bug
        </Link>
        <button
          className="btn btn-outline-danger mx-3"
          onClick={() => deleteBug(bug.id)} // Pass deleteBug as a callback function
        >
          Delete
        </button>

        <Link to={`/project/${params.project_id}`} className="btn btn-primary">
          Return
        </Link>
      </form>
    </div>
  );
};

export default Bug;
