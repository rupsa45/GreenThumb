import CropDetails from "../Features/CropDetails";
import DashBoardNavbar from "../Layout/DashBoardNavbar";
import Navbar from "../Layout/Navbar";
const DetailPage = () => {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-green-50 to-yellow-50`}>
      <DashBoardNavbar />
      <div className=" px-4">
        <CropDetails />
      </div>
    </div>
  );
};

export default DetailPage;
