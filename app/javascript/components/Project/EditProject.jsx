import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [project, setProject] = useState({});
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [user, setUser] = useState({});
  const [errorMessage, setErrorMessage] = useState("");
  const [developers, setDevelopers] = useState([]);
  const [selectedDev, setSelectedDev] = useState(""); // State variable to store the selected developer's ID
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = document.querySelector('meta[name="csrf-token"]').content;
    console.log(token);
    console.log(selectedDev);
    fetch("/api/v1/developers")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        console.log(data);
        setDevelopers(data); // Update state with fetched developers
      })
      .catch((error) => console.error("Error fetching developers:", error));
  }, [selectedDev]); // Empty dependency array to only run effect once on mount
  const onSelectDeveloper = (event) => {
    setSelectedDev(event.target.value); // Update selected developer ID
  };
  useEffect(() => {
    fetch("/api/v1/current_user_info")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setUser(res);
      })
      .catch(() => navigate(`/project/${id}`));
  }, [navigate]);
  useEffect(() => {
    fetch(`/api/v1/show/${id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((data) => {
        setProject(data.project);
        setName(data.project.name);
        setDescription(data.project.description);
      })
      .catch((error) => console.error("Error fetching project:", error));
  }, [id]);

  const onSubmit = (event) => {
    event.preventDefault();
    //   if (!isAuthorized()) {
    //     setErrorMessage('You are not authorized to edit this project.');
    //     return;
    // }
    const projectId = id;
    const url = `/api/v1/update/${projectId}`;
    const updatedUserIds = selectedDev ? [...project.users.map(user => user.id), selectedDev] : project.users.map(user => user.id);
    // Include IDs of existing users and the selected user

    const body = {
      name,
      description,
      user_ids: updatedUserIds,
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
      .then((response) => navigate(`/project/${response.id}`))
      .catch((error) => console.log(error.message));
  };

  const isAuthorized = () => {
    // You need to implement your actual authorization logic here
    // For example, if you have user authentication state, you can check the user's role
    // Replace the placeholder logic with your actual authorization checks
    // Here's an example assuming you have user data available:
    // Check if the user role is 'manager' or 'admin'
    // If yes, return true, otherwise return false

    // Example assuming you have user data available in state
    // Replace 'userRole' with your actual state variable that holds the user's role
    // Example: const userRole = useContext(UserContext); // Assuming you use useContext for user data

    // Assuming 'userRole' holds the user's role (e.g., 'manager', 'admin', etc.)
    // Change this condition based on your actual role check
    if (user.role === "manager") {
      return true;
    } else {
      return false;
    }
  };

  // useEffect(() => {
  //     if (!isAuthorized()) {
  //       history.goBack({ state: { errorMessage: 'You are not authorized to view this page.' } })
  //         // navigate('/'); // Redirect to home page if user is not authorized
  //     }
  // }, [history]);

  return (
    <div className="container py-5">
      <div className="d-flex justify-content-center align-items-center">
        <h1>Project Edit</h1>
      </div>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Project Name:
          </label>
          <input
            className="form-control"
            id="name"
            aria-describedby="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="description" className="form-label">
            Project Description:
          </label>
          <input
            className="form-control"
            id="description"
            aria-describedby="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="developers" className="form-label">
            Developers:
          </label>
          <br />
          <select
            id="developers"
            name="developers"
            className="form-select"
            onChange={onSelectDeveloper} // Add onChange event handler
          >
            <option value="">Select a developer</option>
            {developers.map((developer) => (
              <option key={developer.id} value={developer.id}>
                {developer.email}
              </option>
            ))}
          </select>
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

export default EditProject;
