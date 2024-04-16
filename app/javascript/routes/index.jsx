import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";
import NewRecipe from "../components/NewRecipe";
import Projects from "../components/Project/Projects";
import Project from "../components/Project/Project";
import EditProject from "../components/Project/EditProject";
import NewProject from "../components/Project/NewProject";
import NewBug from "../components/Bug/NewBug";
import Bug from "../components/Bug/Bug";
import EditBug from "../components/Bug/EditBug";
import NotFoundPage from "./NotFoundPage";

export default (
  <Router>
    <Routes>
      <Route path="/" element={<Projects />} />
      <Route path="/project/:id" element={<Project />} />
      <Route path="/project/:project_id/bug/:bug_id" element={<Bug />} />
      <Route path="/projects" element={<Projects />} />
      <Route path="/project/:id/edit" element={<EditProject />} />
      <Route
        path="/project/:project_id/bug/:bug_id/edit"
        element={<EditBug />}
      />
      <Route path="/project/new" element={<NewProject />} />
      <Route path="/project/:project_id/bug/new" element={<NewBug />} />
    </Routes>
  </Router>
);
