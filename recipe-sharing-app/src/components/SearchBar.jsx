import React from "react";
import { useRecipeStore } from "./recipeStore";

function SearchBar() {
  const setSearchTerm = useRecipeStore((state) => state.setSearchTerm);
  const filterRecipes = useRecipeStore((state) => state.filterRecipes);

  const handleChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    filterRecipes();
  };

  return (
    <div style={{ marginBottom: "20px" }}>
      <input
        type="text"
        placeholder="Search recipes..."
        onChange={handleChange}
        style={{ padding: "8px", width: "300px" }} />
    </div>
  );
}

export default SearchBar;