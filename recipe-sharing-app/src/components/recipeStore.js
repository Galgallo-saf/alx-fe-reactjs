import { create } from "zustand";

export const useRecipeStore = create((set, get) => ({
  recipes: [
    {
      id: 1,
      title: "Spaghetti Bolognese",
      ingredients: ["pasta", "beef", "tomato"],
      prepTime: 30,
    },
    {
      id: 2,
      title: "Chicken Curry",
      ingredients: ["chicken", "curry powder", "rice"],
      prepTime: 45,
    },
  ],

  // Search/filter state
  searchTerm: "",
  ingredientFilter: "",
  maxPrepTime: "",
  filteredRecipes: [],

  // Update search term
  setSearchTerm: (term) => set({ searchTerm: term }),
  setIngredientFilter: (ingredient) => set({ ingredientFilter: ingredient }),
  setMaxPrepTime: (time) => set({ maxPrepTime: time }),

  // Filter function
  filterRecipes: () => {
    const { recipes, searchTerm, ingredientFilter, maxPrepTime } = get();

    const filtered = recipes.filter((recipe) => {
      const matchesTitle = recipe.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesIngredient =
        ingredientFilter === "" ||
        recipe.ingredients
          .join(" ")
          .toLowerCase()
          .includes(ingredientFilter.toLowerCase());

      const matchesPrepTime =
        maxPrepTime === "" || recipe.prepTime <= Number(maxPrepTime);

      return matchesTitle && matchesIngredient && matchesPrepTime;
    });

    set({ filteredRecipes: filtered });
  },

  // Add/delete recipes
  addRecipe: (recipe) => set((state) => ({ recipes: [...state.recipes, recipe] })),
  deleteRecipe: (id) => set((state) => ({ recipes: state.recipes.filter((r) => r.id !== id) })),
}));