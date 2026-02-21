import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";
import AddRecipeForm from "./components/AddRecipeForm";
import RecipeList from "./components/RecipeList";
import RecipeDetails from "./components/RecipeDetails";

function App() {
  return (
    <BrowserRouter>
      <div style={{ padding: "20px" }}>
        <h1>Recipe Sharing Application</h1>

        {/* Search and Filters */}
        <SearchBar />
        <Filters />

        {/* Add Recipe */}
        <AddRecipeForm />

        {/* Recipe List */}
        <RecipeList />
      </div>

      <Routes>
    
        <Route path="/" element={<RecipeList />} />
        
        <Route path="/recipes/:id" element={<RecipeDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;