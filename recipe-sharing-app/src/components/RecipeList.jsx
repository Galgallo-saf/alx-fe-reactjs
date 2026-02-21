import React from "react";
import { useRecipeStore } from "./recipeStore";

const RecipeList = () => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const recipes = useRecipeStore((state) => state.recipes);

  const listToDisplay =
    filteredRecipes.length > 0 ? filteredRecipes : recipes;

  if (listToDisplay.length === 0) return <p>No recipes found.</p>;

  return (
    <div>
      {listToDisplay.map((recipe) => (
        <div
          key={recipe.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <h3>{recipe.title}</h3>
          <p>Prep Time: {recipe.prepTime} minutes</p>
          <p>Ingredients: {recipe.ingredients.join(", ")}</p>
          <button onClick={() => deleteRecipe(recipe.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;