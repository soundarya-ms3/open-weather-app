import React, { useState } from "react";
import { getWeather } from "../api/weatherApi";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const data = await getWeather(city);
      setWeather(data);
    } catch (error) {
      setError("Failed to fetch weather data. Please try again.");
      console.error("Error fetching weather", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500">
      <div className="bg-white bg-opacity-90 rounded-lg shadow-2xl p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Weather Prediction
        </h1>
        <input
          type="text"
          placeholder="Enter city name"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-purple-500"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button
          onClick={handleSearch}
          className="w-full bg-purple-500 text-white py-2 rounded font-semibold hover:bg-purple-600 transition duration-300"
        >
          Get Weather
        </button>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

        {weather && (
          <div className="mt-8 bg-white bg-opacity-90 p-6 rounded-lg shadow-md text-gray-800">
            <h2 className="text-2xl font-semibold text-center">
              {weather.name}
            </h2>
            <div className="mt-4 text-center space-y-2">
              <p className="text-lg">
                🌡️ Temperature:{" "}
                <span className="font-bold">{weather.main.temp} °C</span>
              </p>
              <p className="text-lg">
                ☁️ Weather:{" "}
                <span className="font-bold capitalize">
                  {weather.weather[0].description}
                </span>
              </p>
              <p className="text-lg">
                💧 Humidity:{" "}
                <span className="font-bold">{weather.main.humidity} %</span>
              </p>
              <p className="text-lg">
                🌬️ Wind Speed:{" "}
                <span className="font-bold">{weather.wind.speed} m/s</span>
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default WeatherApp;
