import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import { fetchCropImage, getCropDetails, getFertilizer } from "../apis/crop.api"

const CropDetails = () => {
  const { crop } = useParams()
  const [cropDetails, setCropDetails] = useState(null)
  const [fertilizer, setFertilizer] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Estimation states
  const [selectedOption, setSelectedOption] = useState("")
  const [estimationResult, setEstimationResult] = useState(null)
  const [estimationLoading, setEstimationLoading] = useState(false)


  function capitalizeFirstLetter(val) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1)
  }

  useEffect(() => {
    const fetchCropDetails = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await getCropDetails(crop)
        const imageUrl = await fetchCropImage(res.crop_details.crop)
        const fertilizerData = await getFertilizer(crop)
        setCropDetails({
          ...res,
          imageUrl,
        })
        setFertilizer(fertilizerData.recommendations)
      } catch (err) {
        console.error("Error fetching crop details:", err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCropDetails()
  }, [crop])

  const handleEstimation = async () => {
    if (!selectedOption) return

    setEstimationLoading(true)
    try {
      // Mock API call - replace with your actual API endpoint
      // const response = await fetch('/api/estimate', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({
      //     state: cropDetails.crop_details.state,
      //     crop: cropDetails.crop_details.crop,
      //     season: staticSeason,
      //     district: staticDistrict,
      //     option: selectedOption
      //   })
      // });
      // const data = await response.json();

      // Mock response for demonstration
      const mockData = {
        estimated_area: 1344.42,
        estimated_production: 170341.52,
      }

      setEstimationResult(mockData)
    } catch (err) {
      console.error("Error fetching estimation:", err)
    } finally {
      setEstimationLoading(false)
    }
  }

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error}</p>
  if (!cropDetails) return <p>No details available.</p>

  return (
    <div>
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Section */}
          <div>
            <h1 className="text-3xl font-bold mb-4 text-green-800">
              {capitalizeFirstLetter(cropDetails.crop_details.crop)}
            </h1>

            {/* Crop Image Card */}
            <Card className="mb-8 border-green-200 shadow-lg">
              <CardHeader className="bg-green-100">
                <CardTitle className="text-green-800">Crop Image</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="aspect-video relative overflow-hidden rounded-lg mt-5">
                  <img
                    src={cropDetails.imageUrl || "/placeholder.svg"}
                    alt={`${cropDetails.crop_details.crop} field`}
                    className="w-full h-full object-cover"
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
                <div className="mt-5 grid grid-cols-3 gap-4">
                  <div>
                    <p className="font-semibold text-green-700">Nitrogen (N)</p>
                    <p className="text-green-600">{cropDetails.crop_details.N_mean} kg/ha</p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700">Phosphorus (P)</p>
                    <p className="text-green-600">{cropDetails.crop_details.P_mean} kg/ha</p>
                  </div>
                  <div>
                    <p className="font-semibold text-green-700">Potassium (K)</p>
                    <p className="text-green-600">{cropDetails.crop_details.K_mean} kg/ha</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="bg-green-50 border border-green-300 mt-8 shadow-lg p-5 rounded-lg text-center">
              <h1 className="text-green-800 font-bold text-center text-xl">Curious about Market Prices?</h1>
              <p className="text-center font-serif mt-4">
                Wondering how much your crop might sell for in different markets across your state?
                <span className="font-medium"> Click below</span> to explore market-wise price predictions and plan your
                selling strategy better.
              </p>

              <p className="text-sm text-red-600 mt-4 italic">
                Note: Market data may not be available at all times as it gets updated periodically by official sources.
              </p>

              <Link to={`/cost-prediction/${crop}`}>
                <button className="bg-gradient-to-r from-green-600 to-emerald-700 rounded-full font-semibold p-3 mt-5 hover:from-emerald-700 hover:to-green-600 shadow transition duration-300">
                  Check Crop Prices →
                </button>
              </Link>
            </div>
            {/* Estimation Card */}
            <Card className="mb-8 border-purple-200 shadow-lg mt-5">
              <CardHeader className="bg-purple-100">
                <CardTitle className="text-purple-800">Area & Production Estimation</CardTitle>
              </CardHeader>
              <CardContent className="mt-5">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="state" className="text-purple-700">
                        State
                      </Label>
                      <Input
                        id="state"
                        value={capitalizeFirstLetter(cropDetails.crop_details.state)}
                        disabled
                        className="bg-gray-100"
                      />
                    </div>
                    <div>
                      <Label htmlFor="crop" className="text-purple-700">
                        Crop
                      </Label>
                      <Input
                        id="crop"
                        value={capitalizeFirstLetter(cropDetails.crop_details.crop)}
                        disabled
                        className="bg-gray-100"
                      />
                    </div>
                  </div>

                  {/* <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="season" className="text-purple-700">
                        Season
                      </Label>
                      <Input id="season" value={staticSeason} disabled className="bg-gray-100" />
                    </div>
                    <div>
                      <Label htmlFor="district" className="text-purple-700">
                        District
                      </Label>
                      <Input id="district" value={staticDistrict} disabled className="bg-gray-100" />
                    </div>
                  </div> */}

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="estimation-type" className="text-purple-700">
                      District Name
                    </Label>
                    <Select value={selectedOption} onValueChange={setSelectedOption}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select estimation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current-year">Current Year Estimation</SelectItem>
                        <SelectItem value="next-season">Next Season Prediction</SelectItem>
                        <SelectItem value="optimal-conditions">Optimal Conditions</SelectItem>
                        <SelectItem value="average-yield">Average Yield Estimation</SelectItem>
                      </SelectContent>
                    </Select>
                    </div>
                    <div>
                      <Label htmlFor="estimation-type" className="text-purple-700">
                      Season
                    </Label>
                    <Select value={selectedOption} onValueChange={setSelectedOption}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select estimation type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="current-year">Current Year Estimation</SelectItem>
                        <SelectItem value="next-season">Next Season Prediction</SelectItem>
                        <SelectItem value="optimal-conditions">Optimal Conditions</SelectItem>
                        <SelectItem value="average-yield">Average Yield Estimation</SelectItem>
                      </SelectContent>
                    </Select>
                    </div>
                  </div>

                  <Button
                    onClick={handleEstimation}
                    disabled={!selectedOption || estimationLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    {estimationLoading ? "Calculating..." : "Get Estimation"}
                  </Button>

                  {estimationResult && (
                    <div className="mt-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <h3 className="font-semibold text-purple-800 mb-2">Estimation Results</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="font-medium text-purple-700">Estimated Area</p>
                          <p className="text-purple-600">{estimationResult.estimated_area} hectares</p>
                        </div>
                        <div>
                          <p className="font-medium text-purple-700">Estimated Production</p>
                          <p className="text-purple-600">{estimationResult.estimated_production} tonnes</p>
                        </div>
                      </div>
                    </div>
                  )}
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
                <div className="space-y-4 mt-5">
                  <div>
                    <p className="font-semibold text-yellow-700">Average Rainfall</p>
                    <p className="text-yellow-600">{cropDetails.crop_details.rainfall_mean} mm</p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-700">Average Temperature</p>
                    <p className="text-yellow-600">{cropDetails.crop_details.temperature_mean}°C</p>
                  </div>
                  <div>
                    <p className="font-semibold text-yellow-700">Average Humidity</p>
                    <p className="text-yellow-600">{cropDetails.crop_details.humidity_mean}g/m³</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Fertilizer Recommendations Card */}
            {fertilizer && (
              <Card className="mt-8 border-blue-200 shadow-lg">
                <CardHeader className="bg-blue-100">
                  <CardTitle className="text-blue-800">Fertilizer Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mt-5">
                    {fertilizer.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border rounded-lg bg-blue-50">
                        <div>
                          <p className="font-semibold text-blue-700">Fertilizer Name</p>
                          <p className="text-blue-600">{item.fertilizer_name}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-blue-700">Nitrogen (N)</p>
                          <p className="text-blue-600">{item.nitrogen ?? "N/A"}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-blue-700">Phosphorus (P)</p>
                          <p className="text-blue-600">{item.phosphorus ?? "N/A"}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-blue-700">Potassium (K)</p>
                          <p className="text-blue-600">{item.potassium ?? "N/A"}</p>
                        </div>
                        <div>
                          <p className="font-semibold text-blue-700">Soil Moisture</p>
                          <p className="text-blue-600">{item.soil_moisture ?? "N/A"}%</p>
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
  )
}

export default CropDetails
