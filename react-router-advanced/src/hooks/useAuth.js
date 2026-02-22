import { useState } from "react";

export const useAuth = () => {
  // mock authentication state
  const [user, setUser] = useState(null);

  const login = () => setUser({ name: "ALX Student" });
  const logout = () => setUser(null);

  return { user, login, logout };
};