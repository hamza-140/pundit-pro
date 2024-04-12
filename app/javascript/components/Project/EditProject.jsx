import { data } from "autoprefixer";
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const EditProject = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    user_id:[]
  });
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")

  const [checkedUserIds, setCheckedUserIds] = useState([]);

  const [project, setProject] = useState({});
  const [users, setUsers] = useState([]);
  const [allUsers, setAllUsers] = useState([]);

  useEffect(() => {
    // Fetch project details and developers from Rails backend
    const fetchProject = async () => {
      try {
        const response = await fetch(`/api/v1/show/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setProject(data.project);
        console.log(data.users);

        setName(data.project.name);
        setDescription(data.project.description);

        // setUsers(data.users); // Set the users fetched from the API
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };
    fetchProject();
    const fetchUsers = async () => {
      fetch(`/api/v1/users/${id}`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          console.log(data);
          setCheckedUserIds(data.map(user => user.id));
          setUsers(data); // Update state with fetched developers
        })
        .catch((error) => console.error("Error fetching developers:", error));
    };

    fetchUsers();
    const fetchAllUsers = async () => {
      fetch(`/api/v1/developers`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then((data) => {
          console.log(data);
          setAllUsers(data); // Update state with fetched developers
        })
        .catch((error) => console.error("Error fetching developers:", error));
    };

    fetchAllUsers();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUserSelectChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setCheckedUserIds((prevState) => [...prevState, parseInt(value)]);
    } else {
      setCheckedUserIds((prevState) =>
        prevState.filter((id) => id !== parseInt(value))
      );
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("sjs:",checkedUserIds)
    const url = `/api/v1/update/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    try {
      const response = await fetch(url, {
        method: "PUT",
        headers: {
          "X-CSRF-Token": token,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project: {
            name: name,
            description: description,
            user_ids: checkedUserIds, // Include checkedUserIds
          },
        }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok.");
      }

      const data = await response.json();
      navigate(`/project/${data.id}`);
    } catch (error) {
      console.error("Error updating project:", error.message);
    }
  };

  return (
    <div>
      <h2>Edit Project</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label htmlFor="user_ids">Select Users:</label>
          {allUsers.map((user) => (
            <div key={user.id}>
              <input
                type="checkbox"
                id={`user_${user.id}`}
                name="user_ids"
                value={user.id}
                checked={checkedUserIds.includes(user.id)}
                onChange={handleUserSelectChange}
              />
              <label htmlFor={`user_${user.id}`}>{user.email}</label>
            </div>
          ))}
        </div>

        <button type="submit">Update</button>
        <Link to={`/project/${id}`} className="btn btn-outline-primary">
          Return
        </Link>
      </form>
    </div>
  );
};

export default EditProject;
