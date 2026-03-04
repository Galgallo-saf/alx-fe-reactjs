import React from "react";

function WeatherCard({ weather, isFavorite, onToggleFavorite }) {
  const {
    name,
    iconUrl,
    description,
    temp,
    temp_min,
    temp_max,
    humidity,
    speed,
  } = weather;

  return (
    <div className="bg-white shadow-md rounded p-6 text-center">
      <h2 className="text-xl font-bold mb-2">{name}</h2>

      <img src={iconUrl} alt={description} className="mx-auto" />

      <p className="capitalize text-lg">{description}</p>
      <p className="text-2xl font-semibold">{temp}°C</p>
      <p className="text-sm">
        Min: {temp_min}°C | Max: {temp_max}°C
      </p>
      <p className="text-sm">Humidity: {humidity}%</p>
      <p className="text-sm">Wind: {speed} m/s</p>

      <button
        onClick={() => onToggleFavorite(weather)}
        className={`mt-4 px-4 py-2 rounded ${
          isFavorite
            ? "bg-red-500 text-white"
            : "bg-gray-200 text-black"
        }`}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
}

export default WeatherCard;