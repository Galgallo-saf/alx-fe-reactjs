import React from "react";

const WeatherCard = ({ weather }) => {
  if (!weather) return null;

  const {
    name,
    main: { temp, temp_min, temp_max, humidity },
    weather: weatherDetails,
    wind: { speed },
  } = weather;

  const description = weatherDetails[0].description;
  const icon = weatherDetails[0].icon;
  const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

  return (
    <div className="weather-card p-4 rounded shadow-md bg-white text-center max-w-sm mx-auto">
      <h2 className="text-2xl font-bold mb-2">{name}</h2>
      <img src={iconUrl} alt={description} className="mx-auto" />
      
      <p className="capitalize text-lg">{description}</p>
      <p className="text-xl font-semibold">{temp}°C</p>
      <p className="text-sm">
        Min: {temp_min}°C | Max: {temp_max}°C
      </p>
      <p className="text-sm">Humidity: {humidity}%</p>
      <p className="text-sm">Wind: {speed} m/s</p>
    </div>
  );
};

export default WeatherCard;