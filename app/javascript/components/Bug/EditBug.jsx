import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditBug = () => {
  const navigate = useNavigate();

  const { project_id, bug_id } = useParams();
  const [bug, setBug] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    console.log(project_id)
    console.log(bug_id)
    fetch(`/api/v1/project/${project_id.toString()}/bug/${bug_id.toString()}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
        setBug(data);
        setTitle(data.title);
        setDescription(data.description);
      })
      .catch((error) => console.error("Error fetching project:", error));
  }, [bug_id]);

  const onSubmit = (event) => {
    event.preventDefault();
    const bugID = bug_id;
    const url = `/api/v1/bug/update/${bugID}`; // Use the appropriate endpoint for updating

    if (title.length === 0) {
      return;
    }

    const body = {
      title,
      description, // Add the description if needed
      // Add other fields as needed for the update
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT", // Use PUT method for updates
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate(`/project/${project_id}/bug/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center align-items-center">
        <h1>Project Edit</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Bug Title:
          </label>
          <input
            className="form-control"
            id="name"
            aria-describedby="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Bug Description:
          </label>
          <input
            className="form-control"
            id="description"
            aria-describedby="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <button
          className="btn btn-outline-warning"
          style={{ marginRight: "12px" }}
          type="submit"
        >
          Update
        </button>
        <Link
          to="javascript:history.back()"
          className="btn btn-outline-primary"
        >
          Return
        </Link>
      </form>
    </div>
  );
};

export default EditBug;
