import { Card, CardContent } from "../components/ui/card";
import { getWeatherIcon, weatherData } from "../utils/datas";
const SixCards = () => {
  return (
    <div>
      <Card className="bg-white/20 backdrop-blur-lg border-none mt-10">
        <CardContent className="p-4 md:p-6">
          <h2 className="text-xl md:text-2xl font-semibold text-green-800 mb-4">
            6-Day Forecast
          </h2>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
            {weatherData.forecast.map((day, index) => (
              <Card
                key={index}
                className="p-4 bg-white bg-opacity-20 backdrop-blur-lg rounded-xl text-green-800 text-center"
              >
                <p className="font-semibold">{day.day}</p>
                {getWeatherIcon(day.condition, "w-8 h-8 mx-auto my-2")}
                <p>{day.temp}°C</p>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SixCards;
