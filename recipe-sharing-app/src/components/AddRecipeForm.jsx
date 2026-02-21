import React, { useState } from "react";
import { useRecipeStore } from "./recipeStore";

const AddRecipeForm = () => {
  const addRecipe = useRecipeStore((state) => state.addRecipe);

  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [prepTime, setPrepTime] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !ingredients || !prepTime) return;

    const newRecipe = {
      id: Date.now(),
      title,
      ingredients: ingredients.split(",").map((i) => i.trim()),
      prepTime: Number(prepTime),
    };

    addRecipe(newRecipe);

    // Clear form
    setTitle("");
    setIngredients("");
    setPrepTime("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <h3>Add New Recipe</h3>
      <input
        type="text"
        placeholder="Recipe Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <input
        type="text"
        placeholder="Ingredients (comma separated)"
        value={ingredients}
        onChange={(e) => setIngredients(e.target.value)}
      />
      <br />
      <input
        type="number"
        placeholder="Prep Time (minutes)"
        value={prepTime}
        onChange={(e) => setPrepTime(e.target.value)}
      />
      <br />
      <button type="submit">Add Recipe</button>
    </form>
  );
};

export default AddRecipeForm;