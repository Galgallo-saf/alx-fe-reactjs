import axios from "axios";

const BASE_URL = "https://api.github.com";

export const searchUsers = async (query) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/search/users?q=${query}`,
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.VITE_APP_GITHUB_API_KEY}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching users:", error);
    throw error;
  }
};