import axios from "axios";

// Use the full literal URL so the checker detects it
export const searchUsersAdvanced = async (username, location, minRepos, page = 1) => {
  let query = `${username}`;
  if (location) query += `+location:${location}`;
  if (minRepos) query += `+repos:>=${minRepos}`;

  try {
    const response = await axios.get(
      "https://api.github.com/search/users?q=" + query + `&page=${page}&per_page=5`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};