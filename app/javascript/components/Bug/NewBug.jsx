import React, { useState,useEffect } from "react";
import { Link, useNavigate,useParams } from "react-router-dom";

const NewBug = () => {
    const params = useParams()
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  // const [ingredients, setIngredients] = useState("");
  // const [instruction, setInstruction] = useState("");
  const [project, setProject] = useState({});
  useEffect(() => {
    const fetchProject = async () => {
        console.log(params.project_id)
      try {
        const response = await fetch(`/api/v1/show/${params.project_id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }
        const data = await response.json();
        setProject(data.project);
        // setBugs(data.bugs);
      } catch (error) {
        console.error("Error fetching project:", error);
      }
    };

    fetchProject();
  }, [params.id]);
  const stripHtmlEntities = (str) => {
    return String(str)
      .replace(/\n/g, "<br> <br>")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  };

  const onChange = (event, setFunction) => {
    setFunction(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const url = `/api/v1/project/${project.id}/bug/create`;

    if (title.length == 0)
      return;

    const body = {
      title
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
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => navigate(`/project/${project.id}`))
      .catch((error) => console.log(error.message));
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-12 col-lg-6 offset-lg-3">
          <h1 className="font-weight-normal mb-5">
            Add a new bug to  {project.name}
          </h1>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label htmlFor="projectName">Bug Title</label>
              <input
                type="text"
                name="title"
                id="bugTitle"
                className="form-control"
                required
                onChange={(event) => onChange(event, setTitle)}
              />
            </div>
            {/* <div className="form-group">
              <label htmlFor="recipeIngredients">Ingredients</label>
              <input
                type="text"
                name="ingredients"
                id="recipeIngredients"
                className="form-control"
                required
                onChange={(event) => onChange(event, setIngredients)}
              />
              <small id="ingredientsHelp" className="form-text text-muted">
                Separate each ingredient with a comma.
              </small>
            </div>
            <label htmlFor="instruction">Preparation Instructions</label>
            <textarea
              className="form-control"
              id="instruction"
              name="instruction"
              rows="5"
              required
              onChange={(event) => onChange(event, setInstruction)}
            /> */}
            <button type="submit" className="btn custom-button mt-3">
              Create Bug
            </button>
            <Link to="javascript:history.back()" className="btn btn-link mt-3">
              Back to Project
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewBug;