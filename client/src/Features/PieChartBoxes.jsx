import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL;
const SimplePieCharts = ({ state }) => {
  const [soilTypes, setSoilTypes] = useState([]);
  const [npkData, setNpkData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const SOIL_COLORS = ['#4CAF50', '#81C784', '#A5D6A7', '#C8E6C9'];
  const NPK_COLORS = ['#2196F3', '#64B5F6', '#90CAF9'];

  const fetchSoilData = async () => {
    if (!state) return;

    setLoading(true);
    setError("");
    try {
      const response = await fetch(`${FASTAPI_BASE_URL}/soil_analysis?state=${state}`);
      const soilReport = await response.json();
      
      setSoilTypes(
        soilReport.soil_types.map((item) => ({
          name: item.Soil_Types,
          value: item.Percentage * 100,
        }))
      );
      setNpkData([
        { name: "Nitrogen", value: soilReport.npk_values.Nitrogen },
        { name: "Phosphorus", value: soilReport.npk_values.Phosphorus },
        { name: "Potassium", value: soilReport.npk_values.Potassium },
      ]);
    } catch (err) {
      console.error("Error fetching soil report:", err);
      setError("Failed to fetch soil report. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSoilData();
  }, [state]);

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor="middle" 
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    );
  };

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-2 rounded-lg shadow-lg border border-gray-200">
          <p className="font-semibold text-gray-800">{payload[0].payload.name}</p>
          <p className="text-gray-600">
            Value: {payload[0].value.toFixed(1)}%
          </p>
        </div>
      );
    }
    return null;
  };

  const CustomLegend = ({ payload }) => {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 mt-4">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full flex-shrink-0" 
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-sm text-gray-600 truncate">{entry.value}</span>
          </div>
        ))}
      </div>
    );
  };

  if (loading) return <div className="w-full h-64 flex items-center justify-center">Loading...</div>;
  if (error) return <div className="w-full h-64 flex items-center justify-center text-red-600">{error}</div>;
  if (!soilTypes.length || !npkData.length) 
    return <div className="w-full h-64 flex items-center justify-center">No data available for this region.</div>;

  return (
    <div className="container mx-auto px-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Soil Types Pie Chart */}
        <Card className="p-6 bg-white rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Soil Types Distribution</h3>
          <div className="w-full h-[400px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={soilTypes}
                  cx="50%"
                  cy="50%"
                  innerRadius="45%"
                  outerRadius="70%"
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {soilTypes.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={SOIL_COLORS[index % SOIL_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute bottom-0 left-0 right-0">
              <CustomLegend 
                payload={soilTypes.map((item, index) => ({
                  value: item.name,
                  color: SOIL_COLORS[index % SOIL_COLORS.length],
                }))} 
              />
            </div>
          </div>
        </Card>

        {/* NPK Pie Chart */}
        <Card className="p-6 bg-white rounded-lg">
          <h3 className="text-lg font-semibold mb-4">NPK Distribution</h3>
          <div className="w-full h-[400px] relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={npkData}
                  cx="50%"
                  cy="50%"
                  innerRadius="45%"
                  outerRadius="70%"
                  dataKey="value"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {npkData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={NPK_COLORS[index % NPK_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute bottom-0 left-0 right-0">
              <CustomLegend 
                payload={npkData.map((item, index) => ({
                  value: item.name,
                  color: NPK_COLORS[index % NPK_COLORS.length],
                }))} 
              />
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default SimplePieCharts;