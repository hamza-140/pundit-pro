import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Project/Navbar";
import BugList from "./BugList";

const Bugs = ({id}) => {
  const navigate = useNavigate();
  const [bugs, setBugs] = useState([]);
  const [createBugAllowed, setCreateBugAllowed] = useState(false);

  useEffect(() => {
    const url = `/api/v1/projects/${id}/bugs/index`;
    fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((res) => {
        setBugs(res);
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
        
        <BugList 
          bug={bugs}
        />
      </main>
    </div>
  );
};

export default Bugs;
