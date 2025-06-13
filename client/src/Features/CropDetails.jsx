import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  fetchCropImage,
  getCropDetails,
  getFertilizer,
} from "../apis/crop.api";

const CropDetails = () => {
  const { crop } = useParams();
  const [cropDetails, setCropDetails] = useState(null);
  const [fertilizer, setFertilizer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
  }
  useEffect(() => {
    const fetchCropDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await getCropDetails(crop);
        const imageUrl = await fetchCropImage(res.crop_details.crop);
        const fertilizerData = await getFertilizer(crop);
        setCropDetails({
          ...res,
          imageUrl,
        });
        setFertilizer(fertilizerData.recommendations);
      } catch (err) {
        console.error("Error fetching crop details:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCropDetails();
  }, [crop]);

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
              {capitalizeFirstLetter(cropDetails.crop_details.crop)}
              {/* //in {capitalizeFirstLetter(cropDetails.crop_details.state) */}
            </h1>

            {/* Crop Image Card */}
            <Card className="mb-8 border-green-200 shadow-lg">
              <CardHeader className="bg-green-100">
                <CardTitle className="text-green-800">Crop Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative overflow-hidden rounded-lg mt-5">
                  <img
                    src={cropDetails.imageUrl}
                    alt={`${cropDetails.crop_details.crop} field`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Soil Composition Card */}
            <Card className="border-green-200 shadow-lg">
              <CardHeader className="bg-green-100">
                <CardTitle className="text-green-800">
                  Soil Composition
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-semibold text-green-700">Nitrogen (N)</p>
                    <p className="text-green-600">
                      {cropDetails.crop_details.N_mean} kg/ha
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700">
                      Phosphorus (P)
                    </p>
                    <p className="text-green-600">
                      {cropDetails.crop_details.P_mean} kg/ha
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700">
                      Potassium (K)
                    </p>
                    <p className="text-green-600">
                      {cropDetails.crop_details.K_mean} kg/ha
                    </p>
                  </div>
                </div>
                {/* <Separator className="my-4 bg-green-200" /> */}
                {/* <div>
                  <p className="font-semibold text-green-700">Soil pH</p>
                  <p className="text-green-600">
                    {cropDetails.crop_details.pH_mean}
                  </p>
                </div> */}
              </CardContent>
            </Card>
          </div>

          {/* right Section */}
          <div>
            {/* climate Conditions Card */}
            <Card className="mb-8 border-yellow-200 shadow-lg">
              <CardHeader className="bg-yellow-100">
                <CardTitle className="text-yellow-800">
                  Climate Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-yellow-700">
                      Average Rainfall
                    </p>
                    <p className="text-yellow-600">
                      {cropDetails.crop_details.rainfall_mean} mm
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-700">
                      Average Temperature
                    </p>
                    <p className="text-yellow-600">
                      {cropDetails.crop_details.temperature_mean}°C
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-700">
                      Average Temperature
                    </p>
                    <p className="text-yellow-600">
                      {cropDetails.crop_details.humidity_mean}g/m³
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* production Statistics Card */}
            {/* <Card className="border-yellow-200 shadow-lg">
              <CardHeader className="bg-yellow-100">
                <CardTitle className="text-yellow-800">
                  Production Statistics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <p className="font-semibold text-yellow-700">
                      Cultivated Area
                    </p>
                    <p className="text-yellow-600">
                      {cropDetails.crop_details.Area_mean} hectares
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-700">
                      Average Production
                    </p>
                    <p className="text-yellow-600">
                      {cropDetails.crop_details.Production_mean} tonnes
                    </p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-700">Yield</p>
                    <p className="text-yellow-600">
                      {(
                        cropDetails.crop_details.Production_mean /
                        cropDetails.crop_details.Area_mean
                      ).toFixed(2)}{" "}
                      tonnes/hectare
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card> */}
            {/* Fertilizer Recommendations Card */}
            {fertilizer && (
              <Card className="mt-8 border-blue-200 shadow-lg">
                <CardHeader className="bg-blue-100">
                  <CardTitle className="text-blue-800">
                    Fertilizer Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mt-5">
                    {fertilizer.map((item, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-blue-50"
                      >
                        <div>
                          <p className="font-semibold text-blue-700">Fertilizer Name</p>
                          <p className="text-blue-600">
                            {item.fertilizer_name}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-blue-700">
                            Nitrogen (N)
                          </p>
                          <p className="text-blue-600">
                            {item.nitrogen ?? "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-blue-700">
                            Phosphorus (P)
                          </p>
                          <p className="text-blue-600">
                            {item.phosphorus ?? "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-blue-700">
                            Potassium (K)
                          </p>
                          <p className="text-blue-600">
                            {item.potassium ?? "N/A"}
                          </p>
                        </div>
                        <div>
                          <p className="font-semibold text-blue-700">
                            Soil Moisture
                          </p>
                          <p className="text-blue-600">
                            {item.soil_moisture ?? "N/A"}%
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropDetails;
