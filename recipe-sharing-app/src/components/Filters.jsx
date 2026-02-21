import React from "react";
import { useRecipeStore } from "./recipeStore";

const Filters = () => {
  const maxPrepTime = useRecipeStore((state) => state.maxPrepTime);
  const setMaxPrepTime = useRecipeStore((state) => state.setMaxPrepTime);

  const ingredientFilter = useRecipeStore(
    (state) => state.ingredientFilter
  );
  const setIngredientFilter = useRecipeStore(
    (state) => state.setIngredientFilter
  );

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <input
        type="number"
        placeholder="Max prep time (minutes)"
        value={maxPrepTime}
        onChange={(e) => setMaxPrepTime(e.target.value)}
        className="p-2 border rounded-md"
      />

      <input
        type="text"
        placeholder="Filter by ingredient..."
        value={ingredientFilter}
        onChange={(e) => setIngredientFilter(e.target.value)}
        className="p-2 border rounded-md"
      />
    </div>
  );
};

export default Filters;