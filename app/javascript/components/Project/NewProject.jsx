// import React, { useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const NewProject = () => {
//   const navigate = useNavigate();
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [developers, setDevelopers] = useState([]);
//   const [selectedDevs, setSelectedDevs] = useState([]);
//   const [token, setToken] = useState("");
//   // const [ingredients, setIngredients] = useState("");
//   // const [instruction, setInstruction] = useState("");
//   useEffect(() => {
//     const token = document.querySelector('meta[name="csrf-token"]').content;
//     console.log(token)
//     console.log(selectedDevs)
//     fetch("/api/v1/developers")
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error("Network response was not ok.");
//       })
//       .then((data) => {
//         console.log(data);
//         setDevelopers(data); // Update state with fetched developers
//       })
//       .catch((error) => console.error("Error fetching developers:", error));
//   }, [selectedDevs]); // Empty dependency array to only run effect once on mount
//   const onSelectDeveloper = (event) => {
//     const selectedIds = Array.from(event.target.selectedOptions, (option) => option.value);
//     setSelectedDevs(selectedIds);
//   };

//   const stripHtmlEntities = (str) => {
//     return String(str)
//       .replace(/\n/g, "<br> <br>")
//       .replace(/</g, "&lt;")
//       .replace(/>/g, "&gt;");
//   };

//   const onChange = (event, setFunction) => {
//     setFunction(event.target.value);
//   };

//   const onSubmit = (event) => {
//     event.preventDefault();
//     const url = "/api/v1/projects/create";
//     console.log(selectedDevs);

//     if (name.length == 0) return;

//     const body = {
//       name,
//       description,
//       user_ids: selectedDevs, // Pass the array of selected developer IDs
//     };

//     const token = document.querySelector('meta[name="csrf-token"]').content;
//     setToken(token)
//     fetch(url, {
//       method: "POST",
//       headers: {
//         "X-CSRF-Token": token,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     })
//       .then((response) => {
//         if (response.ok) {
//           return response.json();
//         }
//         throw new Error("Network response was not ok.");
//       })
//       .then((response) => navigate(`/project/${response.id}`))
//       .catch((error) => console.log(error.message));
//   };

//   return (
//     <div className="container mt-5">
//       <div className="row">
//         <div className="col-sm-12 col-lg-6 offset-lg-3">
//           <h1 className="font-weight-normal mb-5">
//             Add a new project to bugzilla.
//           </h1>
//           <form onSubmit={onSubmit}>
//             <div className="form-group">
//               <label htmlFor="projectName">Project Name</label>
//               <input
//                 type="text"
//                 name="name"
//                 id="projectName"
//                 className="form-control"
//                 required
//                 onChange={(event) => onChange(event, setName)}
//               />
//             </div>
//             <div className="form-group">
//               <label htmlFor="projectName">Project Description</label>
//               <input
//                 type="text"
//                 name="name"
//                 id="projectName"
//                 className="form-control"
//                 required
//                 onChange={(event) => onChange(event, setDescription)}
//               />
//             </div>
//             <div className="mb-3">
//               <label htmlFor="developers" className="form-label">
//                 Developers:
//               </label>
//               <br />
//               <select
//                 id="developers"
//                 name="developers"
//                 className="form-select"
//                 onChange={onSelectDeveloper} // Add onChange event handler
//               >
//                 <option value="">Select a developer</option>
//                 {developers.map((developer) => (
//                   <option key={developer.id} value={developer.id}>
//                     {developer.email}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             {/* <div className="form-group">
//               <label htmlFor="recipeIngredients">Ingredients</label>
//               <input
//                 type="text"
//                 name="ingredients"
//                 id="recipeIngredients"
//                 className="form-control"
//                 required
//                 onChange={(event) => onChange(event, setIngredients)}
//               />
//               <small id="ingredientsHelp" className="form-text text-muted">
//                 Separate each ingredient with a comma.
//               </small>
//             </div>
//             <label htmlFor="instruction">Preparation Instructions</label>
//             <textarea
//               className="form-control"
//               id="instruction"
//               name="instruction"
//               rows="5"
//               required
//               onChange={(event) => onChange(event, setInstruction)}
//             /> */}

//             <button type="submit" className="btn custom-button mt-3">
//               Create Project
//             </button>
//             <Link to="/projects" className="btn btn-link mt-3">
//               Back to projects
//             </Link>
//             <div className="">
//               {token}
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewProject;

import React, { useState, useEffect } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";

const NewProject = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    user_ids: [],
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch developers and quality assurance users from Rails backend
    const fetchUsers = async () => {
      fetch("/api/v1/developers")
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
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUserSelectChange = (e) => {
    const { options } = e.target;
    const user_ids = Array.from(options)
      .filter((option) => option.selected)
      .map((option) => parseInt(option.value, 10));
    setFormData((prevState) => ({
      ...prevState,
      user_ids,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const url = "/api/v1/projects/create";
    // console.log(selectedDevs);

    const token = document.querySelector('meta[name="csrf-token"]').content;
    // setToken(token)
    fetch(url, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
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
    <div>
      <h2>Add New Project</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="user_ids">Select Users:</label>
          <select
            id="use"
            name="project[user_ids]"
            multiple
            value={formData.user_ids}
            onChange={handleUserSelectChange}
          >
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.email}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default NewProject;

