import React, { useState, useEffect } from "react";
import WeatherCard from "./components/WeatherCard";
import ErrorMessage from "./components/ErrorMessage";

const API_KEY = "efa467e0bfa50a27819f3914318fea49";

function App() {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // ================= FETCH WEATHER =================
  const fetchWeather = async (city) => {
    if (!city) return;

    setLoading(true);
    setError("");

    try {
      // Current weather
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      if (!response.ok) {
        throw new Error("City not found. Please enter a valid city name.");
      }

      const data = await response.json();

      const mappedWeather = {
        name: data.name,
        iconUrl: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
        description: data.weather[0].description,
        temp: data.main.temp,
        temp_min: data.main.temp_min,
        temp_max: data.main.temp_max,
        humidity: data.main.humidity,
        speed: data.wind.speed,
      };

      setWeather(mappedWeather);

      // Forecast (5-day / 3-hour interval → filter daily)
      const forecastResponse = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );

      const forecastData = await forecastResponse.json();

      const dailyData = forecastData.list.filter(
        (_, index) => index % 8 === 0
      );

      setForecast(dailyData.slice(0, 7));

      // Update search history (avoid duplicates)
      setHistory((prev) => [
        mappedWeather,
        ...prev.filter((item) => item.name !== mappedWeather.name),
      ]);

    } catch (err) {
      setError(err.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  // ================= SEARCH =================
  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather(query);
    setQuery("");
  };

  // ================= FAVORITES =================
  const handleToggleFavorite = (weatherItem) => {
    if (favorites.some((fav) => fav.name === weatherItem.name)) {
      setFavorites(favorites.filter((fav) => fav.name !== weatherItem.name));
    } else {
      setFavorites([weatherItem, ...favorites]);
    }
  };

  // ================= LOCAL STORAGE LOAD =================
  useEffect(() => {
    const savedFavorites = localStorage.getItem("favorites");
    const savedHistory = localStorage.getItem("history");

    if (savedFavorites) setFavorites(JSON.parse(savedFavorites));
    if (savedHistory) setHistory(JSON.parse(savedHistory));
  }, []);

  // ================= SAVE TO LOCAL STORAGE =================
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("history", JSON.stringify(history));
  }, [history]);

  // ================= AUTO REFRESH (5 MINUTES) =================
  useEffect(() => {
    if (!weather) return;

    const interval = setInterval(() => {
      fetchWeather(weather.name);
    }, 300000);

    return () => clearInterval(interval);
  }, [weather]);

  // ================= GEOLOCATION =================
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();
        fetchWeather(data.name);
      },
      () => {
        console.log("Geolocation permission denied.");
      }
    );
  }, []);

  // ================= AUTO CLEAR ERROR =================
  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => setError(""), 4000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  return (
    <div className="container mx-auto p-4 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold text-center mb-6">
        Weather Dashboard
      </h1>

      {/* SEARCH */}
      <form onSubmit={handleSearch} className="flex justify-center mb-6">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Enter city name"
          className="border p-2 rounded-l w-64"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 rounded-r"
        >
          Search
        </button>
      </form>

      {loading && (
        <div className="text-center text-blue-500 mb-4">
          Loading weather data...
        </div>
      )}

      <ErrorMessage message={error} />

      {/* CURRENT WEATHER */}
      {weather && !loading && (
        <WeatherCard
          weather={weather}
          isFavorite={favorites.some((f) => f.name === weather.name)}
          onToggleFavorite={handleToggleFavorite}
        />
      )}

      {/* FORECAST */}
      {forecast.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">7-Day Forecast</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {forecast.map((day) => (
              <div
                key={day.dt}
                className="bg-white p-4 rounded shadow text-center"
              >
                <p className="font-semibold">
                  {new Date(day.dt * 1000).toLocaleDateString()}
                </p>
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                  alt=""
                  className="mx-auto"
                />
                <p>{day.main.temp}°C</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FAVORITES */}
      {favorites.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Favorites</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {favorites.map((fav) => (
              <WeatherCard
                key={fav.name}
                weather={fav}
                isFavorite={true}
                onToggleFavorite={handleToggleFavorite}
              />
            ))}
          </div>
        </div>
      )}

      {/* HISTORY */}
      {history.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-bold mb-4">Search History</h2>
          <div className="flex flex-wrap gap-2">
            {history.map((item) => (
              <button
                key={item.name}
                onClick={() => fetchWeather(item.name)}
                className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300"
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;