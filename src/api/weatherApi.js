import axios from "axios";

const GEOCODING_BASE_URL = "http://api.openweathermap.org/geo/1.0/direct";
const WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/weather";

export const getWeather = async (city) => {
  try {
    const geoResponse = await axios.get(GEOCODING_BASE_URL, {
      params: {
        q: city,
        appid: process.env.API_KEY,
      },
    });

    if (geoResponse.data.length === 0) {
      throw new Error("City not found");
    }

    const { lat, lon } = geoResponse.data[0];

    const weatherResponse = await axios.get(WEATHER_BASE_URL, {
      params: {
        lat: lat,
        lon: lon,
        appid: process.env.API_KEY,
        units: "metric",
      },
    });

    return weatherResponse.data;
  } catch (error) {
    console.error("Error fetching the weather data", error);
    throw error;
  }
};
