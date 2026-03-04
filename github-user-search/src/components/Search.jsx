import React, { useState } from "react";
import { searchUsersAdvanced } from "../services/githubService";

function Search() {
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [minRepos, setMinRepos] = useState("");
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(false);
    setUsers([]);
    setPage(1);

    try {
      const data = await searchUsersAdvanced(
        username,
        location,
        minRepos,
        1
      );
      setUsers(data.items);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = page + 1;
    setPage(nextPage);

    try {
      const data = await searchUsersAdvanced(
        username,
        location,
        minRepos,
        nextPage
      );
      setUsers((prev) => [...prev, ...data.items]);
    } catch (err) {
      setError(true);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <form
        onSubmit={handleSearch}
        className="bg-white shadow-md rounded-lg p-6 space-y-4"
      >
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          type="text"
          placeholder="Location"
          className="w-full p-2 border rounded"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />

        <input
          type="number"
          placeholder="Minimum Repositories"
          className="w-full p-2 border rounded"
          value={minRepos}
          onChange={(e) => setMinRepos(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-center mt-4">Loading...</p>}
      {error && (
        <p className="text-center text-red-500 mt-4">
          Looks like we cant find the user
        </p>
      )}

      <div className="grid md:grid-cols-2 gap-6 mt-6">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-white shadow rounded-lg p-4 text-center"
          >
            <img
              src={user.avatar_url}
              alt={user.login}
              className="w-24 h-24 rounded-full mx-auto"
            />
            <h2 className="text-lg font-semibold mt-2">
              {user.login}
            </h2>
            <a
              href={user.html_url}
              target="_blank"
              rel="noreferrer"
              className="text-blue-600 hover:underline"
            >
              View Profile
            </a>
          </div>
        ))}
      </div>

      {users.length > 0 && (
        <div className="text-center mt-6">
          <button
            onClick={loadMore}
            className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
          >
            Load More
          </button>
        </div>
      )}
    </div>
  );
}

export default Search;