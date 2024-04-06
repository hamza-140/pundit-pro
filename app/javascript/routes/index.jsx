import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/Home";
import Recipes from "../components/Recipes";
import Recipe from "../components/Recipe";
import NewRecipe from "../components/NewRecipe";
import Projects from "../components/Projects";
import Project from "../components/Project";
export default (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/recipes" element={<Recipes />} />
      <Route path="/recipe/:id" element={<Recipe />} />
      <Route path="/project/:id" element={<Project />} />
      <Route path="/recipe" element={<NewRecipe />} />
      <Route path="/projects" element={<Projects/>}/>
    </Routes>
  </Router>
);