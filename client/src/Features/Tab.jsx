import { Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../components/ui/tabs";
import CropRecomendation from "./CropRecomendation";
//import Guides from "./Guides";
import WeatherTab from "./WeatherTab";
import { useEffect, useState } from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLocation } from "../Context/LocationProvider";

const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;
const WEATHER_API_KEY = import.meta.env.VITE_WEATHERAPI_KEY;


const Tab = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [soilData, setSoilData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [recentSearches, setRecentSearches] = useState([]);
  const { setState, state } = useLocation();



  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setError(null);
    if (weatherData?.location?.region) {
    setState(weatherData.location.region);
  }

    try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${searchQuery}`
      );

      if (!response.ok) {
        throw new Error("Location not found. Please try again.");
      }

      const weather = await response.json();
      setWeatherData(weather);    
      // Update recent searches
      console.log(weather);

      setRecentSearches((prev) => {
        const newSearches = [
          weather.location.name,
          ...prev.filter((s) => s !== weather.location.name),
        ].slice(0, 5);
        return newSearches;
      });

      const state = weather.location.region;

      const backendResponse = await fetch(
        `${FASTAPI_BASE_URL}/soil_analysis?state=${state}`
      );

      if (!backendResponse.ok) {
        throw new Error("Failed to fetch soil data");
      }

      const soilDataResponse = await backendResponse.json();
      setSoilData(soilDataResponse); // Update soil data state
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  if (weatherData?.location?.region) {
    setState(weatherData.location.region);
  }
}, [weatherData]);


  //const state = weatherData?.location?.region || "";
  // setState(weatherData?.location.region);
  return (
    <div className="space-y-8">
      <div className="max-w-2xl mx-auto px-4">
        <form onSubmit={handleSearch}>
          <div className="relative shadow-sm">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Enter city or location..."
              className="w-full px-4 py-3 pl-12 pr-24 rounded-xl border-2 border-gray-200 focus:outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
            />
            <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
            <button
              type="submit"
              disabled={loading}
              className="absolute right-2 top-2 px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </div>
        </form>
        {recentSearches.length > 0 && (
          <div className="mt-3 flex gap-2">
            {recentSearches.map((search, index) => (
              <button
                key={index}
                onClick={() => setSearchQuery(search)}
                className="px-3 py-1.5 bg-gray-100 rounded-full hover:bg-gray-200 text-sm text-gray-600"
              >
                {search}
              </button>
            ))}
          </div>
        )}
        {/* Error Alert
          {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )} */}
      </div>
      <Tabs defaultValue="weather" className="w-full max-w-6xl mx-auto">
        <TabsList className="bg-white/30 backdrop-blur-lg rounded-lg p-1 md:p-2 mb-6 w-full flex flex-col sm:flex-row space-y-2 sm:space-y-0">
          <TabsTrigger
            value="weather"
            className="text-sm md:text-base text-green-800 flex-1"
          >
            Weather Updates
          </TabsTrigger>
          <TabsTrigger
            value="crops"
            className="text-sm md:text-base text-green-800 flex-1"
          >
            Crop Recommendations
          </TabsTrigger>
          {/* <TabsTrigger
            value="guides"
            className="text-sm md:text-base text-green-800 flex-1"
          >
            Farming Guides
          </TabsTrigger> */}
        </TabsList>
        <WeatherTab
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
          weatherData={weatherData}
          soilData={soilData}
          loading={loading}
          error={error}
        />
        <CropRecomendation state={state} />
        {/* <Guides /> */}
      </Tabs>
    </div>
  );
};

export default Tab;
