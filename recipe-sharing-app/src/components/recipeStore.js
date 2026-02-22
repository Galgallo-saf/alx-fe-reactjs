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

  // =====================
  // Search & Filtering
  // =====================
  searchTerm: "",
  filteredRecipes: [],

  setSearchTerm: (term) => set({ searchTerm: term }),

  filterRecipes: () =>
    set((state) => ({
      filteredRecipes: state.recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(state.searchTerm.toLowerCase())
      ),
    })),

  // =====================
  // Favorites
  // =====================
  favorites: [],

  addFavorite: (recipeId) =>
    set((state) => ({
      favorites: [...state.favorites, recipeId],
    })),

  removeFavorite: (recipeId) =>
    set((state) => ({
      favorites: state.favorites.filter((id) => id !== recipeId),
    })),

  // =====================
  // Recommendations
  // =====================
  recommendations: [],

  generateRecommendations: () => {
    const { recipes, favorites } = get();

    // Simple mock recommendation logic
    const recommended = recipes.filter(
      (recipe) =>
        !favorites.includes(recipe.id) &&
        Math.random() > 0.5
    );

    set({ recommendations: recommended });
  },

  // =====================
  // Existing Features
  // =====================
  addRecipe: (recipe) =>
    set((state) => ({
      recipes: [...state.recipes, recipe],
    })),

  deleteRecipe: (id) =>
    set((state) => ({
      recipes: state.recipes.filter((recipe) => recipe.id !== id),
    })),
}));