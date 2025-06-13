import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Leaf, Droplets, Sprout, TrendingUp } from "lucide-react";

const SoilReportCard = ({ data }) => {
  if (!data) return null;

  const NutrientIndicator = ({ label, value, icon: Icon, color }) => (
    <div className="bg-green-50/50 rounded-lg p-4">
      <div className="flex items-center gap-3 mb-2">
        <div className="bg-white p-2 rounded-full">
          <Icon className={`w-5 h-5 ${color}`} />
        </div>
        <span className="font-medium text-green-800">{label}</span>
      </div>
      <Progress value={value} className="h-2 bg-green-100" indicatorClassName={color} />
      <div className="mt-2 flex justify-between text-sm">
        <span className="text-green-600">Level</span>
        <span className={`font-medium ${color}`}>{value}%</span>
      </div>
    </div>
  );

  const SoilTypeBar = ({ type, percentage }) => (
    <div className="mb-3">
      <div className="flex justify-between text-sm mb-1">
        <span className="text-green-800 font-medium">{type}</span>
        <span className="text-green-600">{percentage.toFixed(1)}%</span>
      </div>
      <div className="w-full bg-green-100 rounded-full h-2">
        <div
          className="bg-green-600 h-2 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );

  return (
    <Card className="bg-gradient-to-br from-white to-green-50 border-none shadow-md">
      <CardContent className="p-6">
         <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-xl font-bold text-gray-800">Soil Analysis Report</h2>
            </div>

        <div className="space-y-8">
          {/* Soil Types Section */}
          <div>
            <h3 className="text-lg font-medium text-green-800 mb-4 flex items-center gap-2">
              {/* <Leaf className="w-5 h-5 text-green-600" /> */}
              Soil Composition
            </h3>
            <div className="bg-white/50 rounded-xl p-4 space-y-3">
              {data.soil_types.map((type, index) => (
                <SoilTypeBar
                  key={index}
                  type={type.Soil_Types}
                  percentage={type.Percentage * 100}
                />
              ))}
            </div>
          </div>

          {/* NPK Values Section */}
          <div>
            <h3 className="text-lg font-medium text-green-800 mb-4 flex items-center gap-2">
              {/* <Flask className="w-5 h-5 text-green-600" /> */}
              Nutrient Analysis
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <NutrientIndicator
                label="Nitrogen"
                value={data.npk_values.Nitrogen}
                icon={Droplets}
                color="text-blue-600"
              />
              <NutrientIndicator
                label="Phosphorus"
                value={data.npk_values.Phosphorus}
                icon={Droplets}
                color="text-orange-600"
              />
              <NutrientIndicator
                label="Potassium"
                value={data.npk_values.Potassium}
                icon={Droplets}
                color="text-purple-600"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SoilReportCard;