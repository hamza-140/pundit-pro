import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const EditBug = () => {
  const navigate = useNavigate();
  // const history = useHistory();

  const { project_id, bug_id } = useParams();
  const [bug, setBug] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  
  const fetchBug = (bugId) => {
    if (!bugId) return;
    fetch(`/api/v1/project/${project_id}/bug/${bugId}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setBug(data);
        setTitle(data.title);
        setDescription(data.description);
      })
      .catch((error) => console.error("Error fetching bug:", error));
  };

  useEffect(() => {
    fetchBug(bug_id);
  }, [bug_id]);

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/project/${project_id}/bug/update/${bug_id}`;

    const body = {
      title,
      description,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "PUT",
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
      .catch((error) => console.error("Error updating bug:", error));
  };

 

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center align-items-center">
        <h1>Bug Edit</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Bug Title:
          </label>
          <input
            className="form-control"
            id="name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Bug Description:
          </label>
          <textarea
            className="form-control"
            id="description"
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
        <Link className="btn btn-outline-primary" href="javascript:history.go(-1)">
          Return
        </Link>
      </form>
    </div>
  );
};

export default EditBug;
