import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const NewBug = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [bug_type, setBugType] = useState("");
  const [status, setStatus] = useState("");
  const [user_id, setuser_id] = useState("");
  const [error, setError] = useState(null); // State for error message
  const [project, setProject] = useState({});
const [users,setUsers] = useState([])
  useEffect(() => {
    fetch(`/api/v1/users/${params.project_id}`)
    .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          console.log(data);
          setUsers(data); // Update state with fetched developers
        })
        .catch((error) => console.error("Error fetching developers:", error));

    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/v1/show/${params.project_id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setProject(data.project);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [params.project_id]);

  const onChange = (event, setValue) => {
    const { name, value } = event.target;
    setValue(value); // Update the state with the new value
  };
  const onChangeSelect = (event) => {
    const selectedIds = Array.from(event.target.selectedOptions, (option) => option.value);
    console.log(selectedIds.toString())
    setuser_id(selectedIds.toString());
  };
  

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/project/${project.id}/bug/create`;

    if (title.length === 0) {
      setError("Bug title cannot be empty");
      return;
    }

    const body = {
      title,
      description,
      deadline,
      bug_type,
      status,
      user_id,
    };

    const token = document.querySelector('meta[name="csrf-token"]').content;
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else if (response.status === 401) {
          throw new Error(
            "Unauthorized: You are not authorized to perform this action."
          );
        } else {
          throw new Error("Network response was not ok.");
        }
      })
      .then((response) => navigate(`/project/${project.id}`))
      .catch((error) => setError(error.message)); // Set error message in case of error
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new bug to {project.name}
          </h1>
          {/* Render alert if there is an error */}
          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="bugTitle">Bug Title</label>
              <input
                type="text"
                name="title"
                id="bugTitle"
                className="form-control"
                required
                onChange={(event) => onChange(event, setTitle)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                name="description"
                id="description"
                className="form-control"
                onChange={(event) => onChange(event, setDescription)}
              ></textarea>
            </div>
            <div className="form-group">
              <label htmlFor="deadline">Deadline</label>
              <input
                type="date"
                name="deadline"
                id="deadline"
                className="form-control"
                onChange={(e) => setDeadline(e.target.value)}
                />
            </div>
            <div className="form-group">
              <label htmlFor="bug_type">Bug Type</label>
              <select
                name="bug_type"
                id="bug_type"
                className="form-control"
                onChange={(event) => onChange(event, setBugType)}
              >
                <option value="">Select Type</option>
                <option value="bug">Bug</option>
                <option value="feature">Feature</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                name="status"
                id="status"
                className="form-control"
                onChange={(event) => onChange(event, setStatus)}
              >
                <option value="">Select Status</option>
                <option value="new">New</option>
                <option value="started">Started</option>
                <option value="resolved">Resolved</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="user_id">Assign to</label>
              <div>
          <label htmlFor="user_ids">Select Users:</label>
          <select
          
            id="user_id"
            name="bug[user_id]"
            value={user_id}
            onChange={onChangeSelect}
            >
                <option selected>Choose Developer</option>

            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </select>
        </div>
            </div>
            <button type="submit" className="btn custom-button mt-3">
              Create Bug
            </button>
            <Link to={`/project/${project.id}`} className="btn btn-link mt-3">
              Back to Project
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBug;
