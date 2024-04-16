import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const EditBug = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [userRole, setUserRole] = useState("");
  const [bugDelete, setBugDelete] = useState(false);

  const { project_id, bug_id } = useParams();
  const [bug, setBug] = useState({});
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [bug_type, setBugType] = useState("");
  const [status, setStatus] = useState("");
  const [user_id, setuser_id] = useState("");
  const [error, setError] = useState(null); // State for error message
  const [project, setProject] = useState({});
  const [users, setUsers] = useState([]);
  const onChangeSelect = (event) => {
    const selectedIds = Array.from(
      event.target.selectedOptions,
      (option) => option.value
    );
    console.log(selectedIds.toString());
    setuser_id(selectedIds.toString());
    // console.log(user_id)

  };
  const onChange = (event, setValue) => {
    const { name, value } = event.target;
    setValue(value); // Update the state with the new value
    console.log(value);
  };
  const handleClick = () => {
    history.goBack(); // Navigate back in history
  };
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
        console.log(data);
        setBug(data);
        setTitle(data.title);
        setDescription(data.description);
        setDeadline(data.deadline)
        setBugType(data.bug_type)
        setStatus(data.status)
        setuser_id(data.user_id)
        // console.log(data.deadline);
      })
      .catch((error) => console.error("Error fetching bug:", error));
  };

  useEffect(() => {
    fetch("/api/v1/current_user_role")
      .then((response) => response.text()) // Parse response as text
      .then((role) => {
        setUserRole(role);

        // Set user role in component state
        // console.log(role)
        if (role === "manager" || role === "quality_assurance") {
          setBugCreate(true);
        } else {
          setBugCreate(false);
        }
      })
      .catch((error) => {
        console.error("Error fetching current user role:", error);
      });
    fetch(`/api/v1/users/${project_id}`)
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
    fetchBug(bug_id);
    console.log(params);
    console.log(Date());
    
  }, [bug_id]);

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/project/${project_id}/bug/update/${bug_id}`;

    const body = {
      title,
      description,
      bug_type,
      user_id,
      deadline,
      status,
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
        <div className="form-group">
          <label htmlFor="deadline">Deadline</label>
          <input
            type="date"
            name="deadline"
            id="deadline"
            // min= {Date.today.strftime(`${Y}-${m}-${d}`)}
            className="form-control"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="bug_type">Bug Type</label>
          <select
            name="bug_type"
            id="bug_type"
            className="form-control"
            value={bug_type}
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
            value={status}
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
              <option>Choose Developer</option>

              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.email}
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          className="btn btn-outline-warning"
          style={{ marginRight: "12px" }}
          type="submit"
        >
          Update
        </button>
        <Link
          to={`/project/${params.project_id}/bug/${params.bug_id}`}
          className="btn btn-primary"
        >
          Return
        </Link>
      </form>
    </div>
  );
};

export default EditBug;
