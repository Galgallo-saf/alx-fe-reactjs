import AddRecipeForm from "./components/AddRecipeForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import RecipeDetail from "./components/RecipeDetail";

function App() {
  return (
    
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <AddRecipeForm />
    </div>
    
  );
}

export default App;
