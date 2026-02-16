import { create } from 'zustand';

export const userecipeStore = create((set) => ({
  recipes: [],

  addRecipe: (newRecipe) =>
    set((state) => ({
      recipes: [...state.recipes, newRecipe],
    })),

  setRecipes: (recipes) => set({ recipes }),
}));
