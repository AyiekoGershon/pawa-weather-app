import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getDailyForecasts } from "../utils/forecast";

export default function Home() {
  const [city, setCity] = useState("");
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [weather, setWeather] = useState<any>(null);
  const [forecast, setForecast] = useState<any[]>([]);

  const fetchWeather = async () => {
    if (!city) return;
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_LARAVEL_API_URL}/weather?city=${city}&unit=${unit}`
      );
      const data = await res.json();
      setWeather(data.current || data); // for compatibility
      setForecast(data.forecast || data.list); // fallback to raw list
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  useEffect(() => {
    if (city) fetchWeather();
  }, [unit]);

  const dailyForecasts = getDailyForecasts(forecast);

  return (
    <main className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold text-center">🌦️ Weather App</h1>

      <div className="flex flex-wrap gap-4 items-center">
        <input
          type="text"
          placeholder="Enter city name..."
          className="input input-bordered w-full md:w-auto"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button className="btn btn-primary" onClick={fetchWeather}>
          Search
        </button>

        <div className="flex items-center gap-2">
          <span>°C</span>
          <input
            type="checkbox"
            className="toggle"
            checked={unit === "imperial"}
            onChange={(e) =>
              setUnit(e.target.checked ? "imperial" : "metric")
            }
          />
          <span>°F</span>
        </div>
      </div>

      {weather && (
        <>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="card shadow-lg p-4">
              <h2 className="text-xl font-semibold">
                {weather.name}, {weather.sys?.country}
              </h2>
              <p>{new Date().toLocaleDateString()}</p>
              <img
                src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                alt="Weather Icon"
                className="w-20 h-20"
              />
              <p className="text-4xl font-bold">
                {Math.round(weather.main.temp)}°
                {unit === "metric" ? "C" : "F"}
              </p>
              <p className="capitalize">{weather.weather[0].description}</p>
            </div>

            <div className="card shadow-lg p-4 space-y-2">
              <div>💨 Wind: {weather.wind.speed} {unit === "metric" ? "m/s" : "mph"}</div>
              <div>💧 Humidity: {weather.main.humidity}%</div>
            </div>
          </motion.div>

          <div className="mt-8">
            <h3 className="text-xl font-semibold mb-4">3-Day Forecast</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {dailyForecasts.map((day, idx) => (
                <div key={idx} className="card shadow-md p-4 text-center">
                  <p className="font-semibold">
                    {new Date(day.date).toDateString()}
                  </p>
                  <img
                    src={`http://openweathermap.org/img/wn/${day.icon}@2x.png`}
                    alt="Icon"
                    className="mx-auto"
                  />
                  <p className="text-xl font-bold">
                    {Math.round(day.temp)}°{unit === "metric" ? "C" : "F"}
                  </p>
                  <p className="capitalize">{day.description}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </main>
  );
}
