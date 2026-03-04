import React from "react";

const WeatherCard = ({ weather, isFavorite, onToggleFavorite }) => {
  const { name, iconUrl, description, temp, temp_min, temp_max, humidity, speed } = weather;

  return (
    <div className="weather-card bg-white rounded shadow-md p-6 mt-4 w-full max-w-sm text-center">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>

      <div className="mb-4">
        <img src={iconUrl} alt={description} className="mx-auto" />
        <p className="capitalize text-lg">{description}</p>
      </div>

      <div className="mb-4">
        <p className="text-xl font-semibold">{temp}°C</p>
        <p className="text-sm">
          Min: {temp_min}°C | Max: {temp_max}°C
        </p>
      </div>

      <div className="mb-4">
        <p className="text-sm">Humidity: {humidity}%</p>
        <p className="text-sm">Wind: {speed} m/s</p>
      </div>

      <div>
        <button
          onClick={() => onToggleFavorite(weather)}
          className={`px-4 py-2 rounded ${
            isFavorite ? "bg-red-500 text-white" : "bg-gray-200 text-black"
          }`}
        >
          {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
        </button>
      </div>
    </div>
  );
};

export default WeatherCard;