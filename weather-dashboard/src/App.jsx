import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import SearchBar from "./components/SearchBar";

const App = () => {
  const [weather, setWeather] = useState(null);
  const [favorites, setFavorites] = useState(() => {
    const saved = localStorage.getItem("favorites");
    return saved ? JSON.parse(saved) : [];
  });
  const [history, setHistory] = useState(() => {
    const saved = localStorage.getItem("history");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist favorites to localStorage
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  // Persist search history to localStorage
  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  const handleSearch = async (city) => {
    const apiKey = "efa467e0bfa50a27819f3914318fea49"; 
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
      );
      if (!response.ok) throw new Error("City not found");
      const data = await response.json();
      setWeather(data);

      // Update search history
      setHistory((prev) => {
        const updated = [city, ...prev.filter((c) => c !== city)];
        return updated.slice(0, 5); // keep last 5 searches
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const addFavorite = () => {
    if (weather && !favorites.some((f) => f.name === weather.name)) {
      setFavorites([weather, ...favorites]);
    }
  };

  const removeFavorite = (name) => {
    setFavorites(favorites.filter((f) => f.name !== name));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Weather Dashboard</h1>
      <SearchBar onSearch={handleSearch} />

      {weather && (
        <div className="my-4">
          <button
            onClick={addFavorite}
            className="px-4 py-2 bg-yellow-500 text-white rounded"
          >
            Add to Favorites
          </button>
          <WeatherCard weather={weather} />
        </div>
      )}

      {history.length > 0 && (
        <div className="my-4">
          <h2 className="font-semibold mb-2">Search History:</h2>
          <ul>
            {history.map((city, idx) => (
              <li key={idx}>
                <button
                  className="text-blue-600 underline mr-2"
                  onClick={() => handleSearch(city)}
                >
                  {city}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {favorites.length > 0 && (
        <div className="my-4">
          <h2 className="font-semibold mb-2">Favorites:</h2>
          <ul>
            {favorites.map((fav, idx) => (
              <li key={idx} className="flex items-center mb-2">
                <span className="mr-2">{fav.name}</span>
                <button
                  className="px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => removeFavorite(fav.name)}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;