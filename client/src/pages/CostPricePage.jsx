import CostPrediction from '../Features/CostPrediction'
import DashboardNav from '../Layout/DashboardNav'

// const sampleCostData = {
//     district: "Murshidabad",
//     market: "Jiaganj",
//     variety: "TD-5",
//     modal_price: "₹6,050",
//     min_price: "₹6,000",
//     max_price: "₹6,100",
//     arrival_date: "13/06/2025",
// }
const CostPricePage = () => {
  return (
    <div >
      <DashboardNav/>
      <CostPrediction />
    </div>
  )
}

export default CostPricePage
