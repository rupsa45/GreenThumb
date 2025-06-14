import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  MapPin,
  Sprout,
  IndianRupee,
  DollarSign,
  TrendingUp,
  TrendingDown,
} from "lucide-react";
import { fetchCropPrices } from "../apis/crop.api";
import { useLocation } from "../Context/LocationProvider";
import { useParams } from "react-router-dom";

const CostPrediction = () => {
  const [priceData, setPriceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const { state} = useLocation(); // ✅ get the state
  const { crop } = useParams();

  useEffect(() => {
    const fetchPriceData = async () => {
      try {
        const response = await fetchCropPrices(state, crop); // pass state to API
        console.log("API Response:", response);
        console.log("State:", state, "Crop:", crop);
        setPriceData(response.price_data || []);
      } catch (error) {
        console.error("Error fetching price data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (state && crop) {
      fetchPriceData();
    }
  }, [state, crop]);

  if (!loading && priceData.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-red-600 mb-2">404</h1>
          <p className="text-lg text-gray-700">
            No market data available for the selected crop and state.
          </p>
        </div>
      </div>
    );
  }

  const getPriceTrend = (modal, min, max) => {
    const avg = (Number(min) + Number(max)) / 2;
    if (modal > avg) return "up";
    if (modal < avg) return "down";
    return "stable";
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);

  const formatDate = (dateString) => {
    const date = new Date(dateString.split("/").reverse().join("-"));
    return date.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const InfoCard = ({ icon: Icon, label, value, className = "" }) => (
    <div className={`bg-white/80 rounded-lg p-4 ${className}`}>
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-green-100 p-2 rounded-full">
          <Icon className="w-4 h-4 text-green-600" />
        </div>
        <span className="text-sm text-gray-600 font-medium">{label}</span>
      </div>
      <div className="text-lg font-semibold text-gray-800">{value}</div>
    </div>
  );

  //if (loading) return <p>Loading market data...</p>

  return (
    <div className="space-y-10">
      {priceData.map((data, index) => {
        const priceTrend = getPriceTrend(
          data.modal_price,
          data.min_price,
          data.max_price
        );

        return (
          <Card key={index}>
            <CardHeader className="bg-gradient-to-r from-green-500 to-green-400 p-4">
              <div className="flex items-center justify-between text-white">
                <div className="flex items-center gap-2">
                  <IndianRupee className="w-5 h-5" />
                  <h2 className="text-xl font-semibold">{`${data.commodity} Price - ${data.market}`}</h2>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-white/20 text-white border-white/30"
                >
                  {formatDate(data.arrival_date)}
                </Badge>
              </div>
            </CardHeader>

            <CardContent className="p-6  space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <InfoCard
                  icon={MapPin}
                  label="District & Market"
                  value={`${data.district} - ${data.market}`}
                />
                <InfoCard icon={Sprout} label="Variety" value={data.variety} />
              </div>

              <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm opacity-90 mb-1">Modal Price</div>
                    <div className="text-3xl font-bold">
                      {formatPrice(data.modal_price)}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {priceTrend === "up" && (
                      <TrendingUp className="w-6 h-6 text-green-200" />
                    )}
                    {priceTrend === "down" && (
                      <TrendingDown className="w-6 h-6 text-red-200" />
                    )}
                    {priceTrend === "stable" && (
                      <div className="w-6 h-6 rounded-full bg-white/20" />
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
                <div className="flex items-center gap-3 mb-6">
                  <div className="bg-blue-100 p-3 rounded-full">
                    <DollarSign className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-800">
                      Price Range Analysis
                    </h3>
                    <p className="text-gray-600">
                      Market price fluctuation range
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div className="text-center p-4 bg-red-50 rounded-xl border border-red-200">
                    <p className="text-red-600 text-sm font-medium mb-1">
                      Minimum Price
                    </p>
                    <p className="text-2xl font-bold text-red-700">
                      {formatPrice(data.min_price)}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-xl border border-green-200">
                    <p className="text-green-600 text-sm font-medium mb-1">
                      Maximum Price
                    </p>
                    <p className="text-2xl font-bold text-green-700">
                      {formatPrice(data.max_price)}
                    </p>
                  </div>
                </div>
                <div className="relative">
                  <div className="h-4 bg-gradient-to-r from-red-200 via-yellow-200 to-green-200 rounded-full"></div>
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>{formatPrice(data.min_price)}</span>
                    <span className="font-medium">
                      Range: {formatPrice(data.min_price)} –{" "}
                      {formatPrice(data.max_price)}
                    </span>
                    <span>{formatPrice(data.max_price)}</span>
                  </div>
                </div>
              </div>
            </CardContent>

      
          </Card>
        );
      })}
       <div className="bg-gradient-to-r from-gray-800 to-gray-900 text-white p-4 text-center">
              <p className="text-gray-300">
                Updated in real-time • For smarter crop decisions
              </p>
            </div>
    </div>
  );
};

export default CostPrediction;
