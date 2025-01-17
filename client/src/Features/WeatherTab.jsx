
import { TabsContent } from "../components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { getWeatherIcon } from "../utils/datas";
import SoilReportCard from "./SoilReportCard";
import PieChartBoxes from "./PieChartBoxes";
import { Droplets,   Wind, Thermometer,  MapPin,  } from "lucide-react";

const WeatherTab = ({
  weatherData,
  soilData,
  error,
}) => {
  const WeatherMetric = ({ icon: Icon, value, label, unit }) => (
    <div className="flex items-center gap-3 bg-green-50/50 p-4 rounded-lg">
      <div className="bg-white p-2 rounded-full">
        <Icon className="w-5 h-5 text-green-600" />
      </div>
      <div className="flex flex-col">
        <span className="text-lg font-semibold text-green-800">
          {value}
          {unit}
        </span>
        <span className="text-sm text-green-600">{label}</span>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Search Section */}
      <div className="max-w-2xl mx-auto px-4">
        

        {/* Error Alert */}
        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </div>

      <TabsContent value="weather" className="space-y-8">
        {weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-4">
            <Card className="bg-gradient-to-br from-white to-green-50 border-none shadow-md">
              <CardContent className="p-6">
                {/* Location Header */}
                <div className="flex items-start justify-between mb-6">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-5 h-5 text-green-600" />
                      <h2 className="text-2xl font-semibold text-green-800">
                        {weatherData.location.name}
                      </h2>
                    </div>
                    <p className="text-green-600 ml-7">
                      {weatherData.location.region},{" "}
                      {weatherData.location.country}
                    </p>
                  </div>
                  <div className="text-6xl">
                    {getWeatherIcon(
                      weatherData.current?.condition?.text?.toLowerCase()
                    )}
                  </div>
                </div>

                {/* Temperature Display */}
                <div className="mb-8 bg-white/50 p-4 rounded-xl">
                  <div className="flex items-baseline gap-4">
                    <span className="text-5xl font-bold text-green-800">
                      {weatherData.current?.temp_f || "--"}°F
                    </span>
                    <span className="text-xl text-green-600">
                      {weatherData.current?.condition?.text || "Unknown"}
                    </span>
                  </div>
                </div>

                {/* Weather Metrics Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <WeatherMetric
                    icon={Droplets}
                    value={weatherData.current?.humidity}
                    unit="%"
                    label="Humidity"
                  />
                  <WeatherMetric
                    icon={Wind}
                    value={weatherData.current?.wind_mph}
                    unit=" mph"
                    label="Wind Speed"
                  />
                  <WeatherMetric
                    icon={Thermometer}
                    value={weatherData.current?.feelslike_f}
                    unit="°F"
                    label="Feels Like"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Soil Report Card */}
            {soilData && <SoilReportCard data={soilData} />}
          </div>
        )}
        {weatherData && (
          <div className="px-4">
            <PieChartBoxes state={weatherData?.location?.region} />
          </div>
        )}
      </TabsContent>
    </div>
  );
};

export default WeatherTab;
