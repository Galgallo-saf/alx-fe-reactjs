import { useState } from "react";

export function useAuth() {
  // Simple simulated login status
  const [isAuthenticated] = useState(true); 
  // Change to false to simulate logged-out user

  return { isAuthenticated };
}