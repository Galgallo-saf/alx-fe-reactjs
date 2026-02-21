import React from "react";
import { useParams } from "react-router-dom";
import { useRecipeStore } from "./recipeStore";

const RecipeDetails = () => {
  const { id } = useParams();
  const recipe = useRecipeStore((state) =>
    state.recipes.find((r) => r.id === Number(id))
  );

  if (!recipe) return <p>Recipe not found!</p>;

  return (
    <div>
      <h2>{recipe.title}</h2>
      <p>Prep Time: {recipe.prepTime} minutes</p>
      <p>Ingredients: {recipe.ingredients.join(", ")}</p>
    </div>
  );
};

export default RecipeDetails;