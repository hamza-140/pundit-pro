import React, { useState, useEffect } from 'react';
import { Link,useParams ,useNavigate} from 'react-router-dom';

const EditProject = () => {
    const navigate = useNavigate();

  const { id } = useParams();
  const [project, setProject] = useState({});
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch(`/api/v1/show/${id}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Network response was not ok.');
      })
      .then(data => {
        console.log(data)
        setProject(data.project);
        setName(data.project.name)
        setDescription(data.project.description)
      })
      .catch(error => console.error('Error fetching project:', error));
  }, [id]);
  

  const onSubmit = (event) => {
    event.preventDefault();
    const projectId = id;
    const url = `/api/v1/update/${projectId}`; // Use the appropriate endpoint for updating
  
    if (name.length === 0) {
      return;
    }
  
    const body = {
      name,
      description // Add the description if needed
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
      .then((response) => navigate(`/project/${response.id}`))
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
        <button className='btn btn-outline-warning' style={{marginRight:"12px"}} type="submit">Update</button>
        <Link to="/projects" className="btn btn-outline-primary">
          Back to Projects
        </Link>
      </form>
    </div>
  );
};

export default EditProject;
