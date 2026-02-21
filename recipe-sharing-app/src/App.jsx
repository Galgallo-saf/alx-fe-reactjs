import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import RecipeDetails from "./components/RecipeDetails";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";

function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Recipe Sharing Application</h1>

      {/* Search */}
      <SearchBar />

      {/* Additional filters */}
      <Filters />

      {/* Add new recipe */}
      <AddRecipeForm />

      {/* Recipe list */}
      <RecipeList />
    </div>
  );
}

export default App;