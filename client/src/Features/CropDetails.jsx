import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { getCropDetails } from "../apis/crop.api";
const CropDetails = () => {
  const { state, crop } = useParams();
  const [cropDetails, setCropDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
 
  useEffect(() => {
    const fetchCropDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await getCropDetails(state,crop)

        if (!response.ok) {
          throw new Error("Failed to fetch crop details");
        }

        const data = await response.json();
        setCropDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCropDetails();
  }, [state, crop]);

 
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!cropDetails) return <p>No details available.</p>;

  return (
    <div className="mt-8">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section */}
          <div>
            <h1 className="text-3xl font-bold mb-4 text-green-800">
              {cropDetails.crop} in {cropDetails.state}
            </h1>

            {/* Crop Image Card */}
            <Card className="mb-8 border-green-200 shadow-lg">
              <CardHeader className="bg-green-100">
                <CardTitle className="text-green-800">Crop Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative overflow-hidden rounded-lg">
                  <img
                    src="/placeholder.svg?height=400&width=600"
                    alt={`${cropDetails.crop} field`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Soil Composition Card */}
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="bg-green-100">
                <CardTitle className="text-green-800">Soil Composition</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-semibold text-green-700">Nitrogen (N)</p>
                    <p className="text-green-600">{cropDetails.N_mean} kg/ha</p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700">Phosphorus (P)</p>
                    <p className="text-green-600">{cropDetails.P_mean} kg/ha</p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700">Potassium (K)</p>
                    <p className="text-green-600">{cropDetails.K_mean} kg/ha</p>
                  </div>
                </div>
                <Separator className="my-4 bg-green-200" />
                <div>
                  <p className="font-semibold text-green-700">Soil pH</p>
                  <p className="text-green-600">{cropDetails.pH_mean.toFixed(2)}</p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Section */}
          <div>
            {/* Climate Conditions Card */}
            <Card className="mb-8 border-yellow-200 shadow-lg">
              <CardHeader className="bg-yellow-100">
                <CardTitle className="text-yellow-800">Climate Conditions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-yellow-700">Average Rainfall</p>
                    <p className="text-yellow-600">
                      {cropDetails.Rainfall_mean.toFixed(2)} mm
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-700">Average Temperature</p>
                    <p className="text-yellow-600">
                      {cropDetails.Temperature_mean.toFixed(2)}°C
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Production Statistics Card */}
            <Card className="border-yellow-200 shadow-lg">
              <CardHeader className="bg-yellow-100">
                <CardTitle className="text-yellow-800">Production Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-yellow-700">Cultivated Area</p>
                    <p className="text-yellow-600">
                      {cropDetails.Area_mean.toFixed(2)} hectares
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-700">Average Production</p>
                    <p className="text-yellow-600">
                      {cropDetails.Production_mean.toFixed(2)} tonnes
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-700">Yield</p>
                    <p className="text-yellow-600">
                      {(cropDetails.Production_mean / cropDetails.Area_mean).toFixed(
                        2
                      )}{" "}
                      tonnes/hectare
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetails;
