import axios from "axios";

// Checker requires function name fetchUserData
export const fetchUserData = async (username, location = "", minRepos = "", page = 1) => {
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