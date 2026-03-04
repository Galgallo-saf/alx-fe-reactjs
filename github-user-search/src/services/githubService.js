import axios from "axios";

const BASE_URL = "https://api.github.com";

export const searchUsersAdvanced = async (
  username,
  location,
  minRepos,
  page = 1
) => {
  let query = `${username}`;

  if (location) {
    query += `+location:${location}`;
  }

  if (minRepos) {
    query += `+repos:>=${minRepos}`;
  }

  try {
    const response = await axios.get(
      `${BASE_URL}/search/users?q=${query}&page=${page}&per_page=5`
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};