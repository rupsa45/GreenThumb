import { TabsContent } from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { fetchmonthylyAvg, predictCrop } from "../apis/crop.api";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Thermometer, CloudRain, Droplets } from "lucide-react";
import { Link } from "react-router-dom";

const CropRecommendation = ({ state }) => {
  const [topCrops, setTopCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    nitrogen: "",
    phosphorus: "",
    potassium: "",
    // populated from API
    temperature: "",
    humidity: "",
    rainfall: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const capitalizeFirstLetter = (val) =>
    String(val).charAt(0).toUpperCase() + String(val).slice(1);

  useEffect(() => {
    if (!state) return;

    const fetchEnvironmentalData = async () => {
      try {
        const res = await fetchmonthylyAvg(state);
        setFormData((prev) => ({
          ...prev,
          temperature: res.average_temperature_c,
          humidity: res.average_humidity_percent,
          rainfall: res.total_rainfall_mm,
        }));
      } catch (err) {
        console.error("Error fetching environmental data:", err);
        setError("Could not load environmental data.");
      }
    };

    fetchEnvironmentalData();
  }, [state]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { nitrogen, phosphorus, potassium, temperature, humidity, rainfall } =
      formData;

    if (!nitrogen || !phosphorus || !potassium) {
      setError("Please fill in all N, P, K values.");
      return;
    }

    if (!temperature || !humidity || !rainfall) {
      setError("Environmental data not loaded.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const cropPrediction = await predictCrop(
        parseFloat(nitrogen),
        parseFloat(phosphorus),
        parseFloat(potassium),
        parseFloat(temperature),
        parseFloat(humidity),
        parseFloat(rainfall)
      );

      const filteredCrops = cropPrediction
        .filter((crop) => crop.probability > 0)
        .sort((a, b) => b.probability - a.probability)
        .slice(0, 5);

      setTopCrops(filteredCrops);
      setSubmitted(true);
      if (cropPrediction) {
        setFormData({
          nitrogen: "",
          phosphorus: "",
          potassium: "",
        });
      }
    } catch (err) {
      console.error("Prediction failed:", err);
      setError("Failed to get crop recommendations.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <TabsContent value="crops">
      <Card className="bg-white/20 backdrop-blur-lg border-none shadow-2xl">
        <CardContent className="p-6 md:p-8">
          <h2
            className="
               text-2xl md:text-3xl font-bold text-green-900 mb-8 font-serif text-center
          "
          >
            Crop Recommendation System
          </h2>

          {/* Form Start */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { id: "nitrogen", label: "Nitrogen (N)", color: "blue-500" },
                {
                  id: "phosphorus",
                  label: "Phosphorus (P)",
                  color: "orange-500",
                },
                {
                  id: "potassium",
                  label: "Potassium (K)",
                  color: "purple-500",
                },
              ].map(({ id, label, color }) => (
                <div className="space-y-2" key={id}>
                  <Label
                    htmlFor={id}
                    className={`text-green-800 font-semibold flex items-center gap-2`}
                  >
                    <div className={`w-3 h-3 bg-${color} rounded-full`}></div>
                    {label}
                  </Label>
                  <Input
                    id={id}
                    type="number"
                    value={formData[id]}
                    onChange={(e) => handleInputChange(id, e.target.value)}
                    className="bg-white/50 border-green-300 focus:border-green-500 focus:ring-green-500"
                    min="0"
                    step="0.1"
                  />
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <InputDisplay
                id="temperature"
                label="Temperature (°C)"
                value={formData.temperature}
                Icon={Thermometer}
              />
              <InputDisplay
                id="rainfall"
                label="Rainfall (mm)"
                value={formData.rainfall}
                Icon={CloudRain}
              />
              <InputDisplay
                id="humidity"
                label="Humidity (%)"
                value={formData.humidity}
                Icon={Droplets}
              />
            </div>

            <div className="flex justify-center">
              <Button
                type="submit"
                disabled={loading}
                className="
                bg-gradient-to-r from-[#4CA771] to-[#013237] hover:from-[#013237] hover:to-[#4CA771] 
                focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#4CA771] transition-all 
                duration-300 text-white px-8 py-3 text-lg font-semibold rounded-lg shadow-lg
                "
              >
                {loading ? "Analyzing..." : "Get Crop Recommendations"}
              </Button>
            </div>
          </form>

          {error && (
            <div className="mt-6 text-center text-red-700 bg-red-100 border border-red-300 px-4 py-2 rounded">
              {error}
            </div>
          )}

          {submitted && !loading && !error && topCrops.length > 0 && (
            <div className="mt-8 space-y-4">
              <h3 className="text-xl font-bold text-center text-green-900">
                Top 5 Recommended Crops for {state}
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                {topCrops.map(({ crop, probability }, index) => (
                  <div
                    key={index}
                    className="bg-white/50 p-4 rounded-lg shadow text-center"
                  >
                    <Link to={`/crop-detail/${crop}`} target="blank">
                      <div className="text-green-700 font-semibold">
                        {capitalizeFirstLetter(crop)}
                      </div>
                      <div className="text-sm">
                        Suitability: {(probability * 100).toFixed(1)}%
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </TabsContent>
  );
};

const InputDisplay = ({ id, label, value, Icon }) => (
  <div className="space-y-2">
    <Label
      htmlFor={id}
      className="text-green-800 font-semibold flex items-center gap-2"
    >
      <Icon className="w-4 h-4" /> {label}
    </Label>
    <Input
      id={id}
      type="number"
      value={value}
      disabled
      className="bg-gray-100/70 border-gray-300 text-gray-600 cursor-not-allowed"
    />
  </div>
);

export default CropRecommendation;
