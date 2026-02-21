import React from "react";
import { useRecipeStore } from "./recipeStore";
import { Link } from "react-router-dom";

const RecipeList = () => {
  const deleteRecipe = useRecipeStore((state) => state.deleteRecipe);
  const filteredRecipes = useRecipeStore((state) => state.filteredRecipes);
  const recipes = useRecipeStore((state) => state.recipes);


  const listToDisplay = filteredRecipes.length > 0 ? filteredRecipes : recipes;

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
            borderRadius: "5px",
          }}
        >
          {/* Recipe title is now a clickable Link */}
          <h3>
            <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: "none", color: "#007bff" }}>
              {recipe.title}
            </Link>
          </h3>

          <p>Prep Time: {recipe.prepTime} minutes</p>
          <p>Ingredients: {recipe.ingredients.join(", ")}</p>

          <button
            onClick={() => deleteRecipe(recipe.id)}
            style={{
              padding: "5px 10px",
              backgroundColor: "#dc3545",
              color: "#fff",
              border: "none",
              borderRadius: "3px",
              cursor: "pointer",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;