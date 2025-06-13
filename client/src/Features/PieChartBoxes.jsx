import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts"

const FASTAPI_BASE_URL = import.meta.env.VITE_FASTAPI_BASE_URL

const PieChartBoxes = ({ state }) => {
  const [soilTypes, setSoilTypes] = useState([])
  const [npkData, setNpkData] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  // More vibrant, matching colors
  const SOIL_COLORS = ["#4CAF50", "#388E3C", "#66BB6A", "#81C784"]
  const NPK_COLORS = ["#2196F3", "#42A5F5", "#90CAF9"]

  const fetchSoilData = async () => {
    if (!state) return

    setLoading(true)
    setError("")
    try {
      const response = await fetch(`${FASTAPI_BASE_URL}/soil_analysis?state=${state}`)
      const soilReport = await response.json()

      setSoilTypes(
        soilReport.soil_types.map((item) => ({
          name: item.Soil_Types,
          value: item.Percentage * 100,
        })),
      )
      setNpkData([
        { name: "Nitrogen", value: soilReport.npk_values.Nitrogen },
        { name: "Phosphorus", value: soilReport.npk_values.Phosphorus },
        { name: "Potassium", value: soilReport.npk_values.Potassium },
      ])
    } catch (err) {
      console.error("Error fetching soil report:", err)
      setError("Failed to fetch soil report. Please try again later.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSoilData()
  }, [state])

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={12} fontWeight="bold">
        {`${(percent * 100).toFixed(1)}%`}
      </text>
    )
  }

  // Custom tooltip component
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-100">
          <p className="font-semibold text-gray-800">{payload[0].payload.name}</p>
          <p className="text-gray-600">Value: {payload[0].value.toFixed(1)}%</p>
        </div>
      )
    }
    return null
  }

  const CustomLegend = ({ payload, colors }) => {
    return (
      <div className="grid grid-cols-2 gap-3 mt-4">
        {payload.map((entry, index) => (
          <div key={`legend-${index}`} className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full flex-shrink-0"
              style={{ backgroundColor: colors[index % colors.length] }}
            />
            <span className="text-sm text-gray-700 truncate">{entry.name}</span>
          </div>
        ))}
      </div>
    )
  }

  if (loading)
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        </Card>
        <Card className="p-6">
          <div className="w-full h-64 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500"></div>
          </div>
        </Card>
      </div>
    )

  if (error)
    return (
      <Card className="p-6">
        <div className="w-full h-64 flex items-center justify-center text-red-600">{error}</div>
      </Card>
    )

  if (!soilTypes.length || !npkData.length)
    return (
      <Card className="p-6">
        <div className="w-full h-64 flex items-center justify-center text-gray-500">
          No data available for this region.
        </div>
      </Card>
    )

  return (
    <div className="container mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Soil Types Pie Chart */}
        <Card className="overflow-hidden border border-green-100 shadow-md">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-400 p-4">
            <h3 className="text-lg font-semibold text-white">Soil Types Distribution</h3>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            <div className="w-full h-[300px] relative">
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
                    animationDuration={1000}
                    animationBegin={200}
                  >
                    {soilTypes.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={SOIL_COLORS[index % SOIL_COLORS.length]}
                        stroke="#fff"
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <CustomLegend payload={soilTypes} colors={SOIL_COLORS} />
          </CardContent>
        </Card>

        {/* NPK Pie Chart */}
        <Card className="overflow-hidden border border-green-100 shadow-md">
          <CardHeader className="bg-gradient-to-r from-green-500 to-green-400 p-4">
            <h3 className="text-lg font-semibold text-white">NPK Distribution</h3>
          </CardHeader>
          <CardContent className="p-6 bg-white">
            <div className="w-full h-[300px] relative">
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
                    animationDuration={1000}
                    animationBegin={200}
                  >
                    {npkData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={NPK_COLORS[index % NPK_COLORS.length]}
                        stroke="#fff"
                        strokeWidth={1}
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <CustomLegend payload={npkData} colors={NPK_COLORS} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default PieChartBoxes
