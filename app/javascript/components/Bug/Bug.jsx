import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Bug = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState({});
  const [bug, setBug] = useState([]);
  const [userRole, setUserRole] = useState("");
  const [users, setUsers] = useState([]);
  useEffect(() => {
    fetch("/api/v1/current_user_role")
      .then((response) => response.text()) // Parse response as text
      .then((role) => {
        setUserRole(role);

        // Set user role in component state
        // console.log(role)
      })
      .catch((error) => {
        console.error("Error fetching current user role:", error);
      });
    fetch(`/api/v1/users/${params.project_id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        // console.log(data.find((user) => user.id === 5)?.email || "");

        // setCheckedUserIds(data.map(user => user.id));
        setUsers(data); // Update state with fetched developers
      })
      .catch((error) => console.error("Error fetching developers:", error));
    fetch(`/api/v1/project/${params.project_id}/bug/${params.bug_id}`)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        console.log(res);
        setBug(res);
      })
      .catch(() => navigate(`/project/${params.project_id}`));
    // console.log(users)
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
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Bug Deadline:
          </label>
          <input
            readOnly
            className="form-control"
            id="description"
            aria-describedby="description"
            value={bug.deadline}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Bug Type:
          </label>
          <input
            readOnly
            className="form-control"
            id="description"
            aria-describedby="description"
            value={bug.bug_type}
          />
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Status:
          </label>
          <input
            readOnly
            className="form-control"
            id="description"
            aria-describedby="description"
            value={bug.status}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Assigned To:
          </label>
          <input
            readOnly
            className="form-control"
            id="description"
            aria-describedby="description"
            value={
              (bug && users.find((user) => user.id === bug.user_id)?.email) ||
              ""
            }
          />
        </div>
        <Link
          to={`/project/${bug.project_id}/bug/${bug.id}/edit`}
          className="btn btn-outline-success text-nowrap"
        >
          Edit Bug
        </Link>
        {userRole == "manager" && (
          <button
            className="btn btn-outline-danger mx-3"
            onClick={() => deleteBug(bug.id)} // Pass deleteBug as a callback function
          >
            Delete
          </button>
        )}

        <Link to={`/project/${params.project_id}`} className="btn btn-primary mx-1">
          Return
        </Link>
      </form>
    </div>
  );
};

export default Bug;
