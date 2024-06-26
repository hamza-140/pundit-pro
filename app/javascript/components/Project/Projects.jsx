import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

import ProjectList from "./ProjectList"; // Import the ProjectList component

const Projects = () => {
  const navigate = useNavigate();
  const [userRole, setUserRole] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [projects, setProjects] = useState([]);
  const [createProjectAllowed, setCreateProjectAllowed] = useState(false);
  // const handleLogout = () => {
  //   axios.delete('/users/sign_out') // Send a DELETE request to the logout path
  //     .then(response => {
  //       // Handle success, like redirecting the user to the login page
  //       window.location.href = '/';
  //     })
  //     .catch(error => {
  //       // Handle error, like displaying an error message
  //       console.error('Logout failed:', error);
  //     });
  // };
  
  useEffect(() => {
    fetch('/api/v1/current_user_email')
      .then(response => response.text()) // Parse response as text
      .then(role => {
        setUserEmail(role); 
      })
      .catch(error => {
        console.error('Error fetching current user role:', error);
      });
      fetch('/api/v1/current_user_role')
      .then(response => response.text()) // Parse response as text
      .then(role => {
        setUserRole(role); 
        // Set user role in component state
        // console.log(role)
        if (role === 'manager') {
          setCreateProjectAllowed(true);
        } else {
          setCreateProjectAllowed(false);
        }
      })
      .catch(error => {
        console.error('Error fetching current user role:', error);
      });
    const url = "/api/v1/projects/index";
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setProjects(res);
      })
      .catch(() => navigate("/"));
  }, [navigate]);

 
  const editProjectPath = (projectId) => {
    // Logic to generate edit project path
    return `/project/${projectId}/edit`;
  };

  return (
    <div className="py-5">
      <main className="container">
        <Navbar 
          createProjectAllowed={createProjectAllowed}
          newProjectPath="/project/new"
        />
        <ProjectList 
          projects={projects}
          editProjectPath={editProjectPath}
        />
      </main>
      {/* <button onClick={handleLogout}>
      Log out
    </button> */}
    <div style={{fontWeight:'bold'}}>
      <span style={{color:'green'}}>Logged in as: </span>{userEmail} as <span style={{color:'GrayText'}}>{userRole}</span>
    </div>
    </div>
    
  );
};

export default Projects;
