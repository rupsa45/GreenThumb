import { TabsContent } from "../components/ui/tabs";
import { Card, CardContent } from "../components/ui/card";
import { Sprout } from "lucide-react";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { fetchCrops } from "../apis/crop.api";

const CropRecommendation = ({ state }) => {
  const [topCrops, setTopCrops] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  useEffect(() => {
    if (!state) return;

    const getCrops = async () => {
      setLoading(true);
      setError(null);

      try {
        const crops = await fetchCrops(state);
        setTopCrops(crops);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getCrops();
  }, [state]);

  return (
    <div>
      <TabsContent value="crops">
        <Card className="bg-white/20 backdrop-blur-lg border-none">
          <CardContent className="p-6 md:p-8">
            <h2 className="text-2xl md:text-3xl font-bold text-green-900 mb-6 font-serif">
              Recommended Crops
            </h2>
            {loading && (
              <div className="flex justify-center items-center h-20">
                <svg
                  className="animate-spin h-8 w-8 text-green-600"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v8H4z"
                  ></path>
                </svg>
              </div>
            )}
            {error && (
              <p className="text-center text-red-600 bg-red-100 p-3 rounded-lg">
                {error}
              </p>
            )}
            {!loading && !error && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {topCrops.map((crop, index) => (
                  <div
                    key={index}
                    className="p-6 bg-white/30 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Sprout className="w-6 h-6 md:w-8 md:h-8 text-green-700" />
                      <h3 className="text-xl md:text-2xl font-medium text-green-800">
                        <Link to={`/crop-detail/${state}/${crop}`}>{capitalizeFirstLetter(crop)}</Link>
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </div>
  );
};

CropRecommendation.propTypes = {
  state: PropTypes.string.isRequired,
};

export default CropRecommendation;
