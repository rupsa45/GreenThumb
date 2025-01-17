import CropDetails from "../Features/CropDetails";
import Navbar from "../Layout/Navbar";
const DetailPage = () => {
  return (
    <div className={`min-h-screen bg-gradient-to-b from-green-50 to-yellow-50`}>
      <Navbar />
      <div className=" px-4 py-8">
        <CropDetails />
      </div>
    </div>
  );
};

export default DetailPage;
