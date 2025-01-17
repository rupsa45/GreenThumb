import { Cloud, CloudRain, Sun } from "lucide-react";

export const weatherData = {
  current: {
    temp: 75,
    condition: "Sunny",
    humidity: 60,
    windSpeed: 8,
  },
  forecast: [
    { day: "Tue", temp: 76, condition: "sunny" },
    { day: "Wed", temp: 72, condition: "cloudy" },
    { day: "Thu", temp: 68, condition: "rainy" },
    { day: "Fri", temp: 71, condition: "cloudy" },
    { day: "Sat", temp: 74, condition: "sunny" },
    { day: "Sun", temp: 77, condition: "sunny" },
  ],
};

export const getWeatherIcon = (condition) => {
  switch (condition) {
    case "sunny":
      return <Sun className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />;
    case "cloudy":
      return <Cloud className="w-6 h-6 md:w-8 md:h-8 text-gray-400" />;
    case "rainy":
      return <CloudRain className="w-6 h-6 md:w-8 md:h-8 text-blue-400" />;
    default:
      return <Sun className="w-6 h-6 md:w-8 md:h-8 text-yellow-400" />;
  }
};

export const soilData = {
  ph: 6.8,
  moisture: 75,
  temperature: 68,
  nutrients: {
    nitrogen: "High",
    phosphorus: "Medium",
    potassium: "Medium",
  },
};
