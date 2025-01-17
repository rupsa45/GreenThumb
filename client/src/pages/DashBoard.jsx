

import Navbar from "../Layout/Navbar";
import Tab from "../Features/Tab";

const DashBoard = () => {
  

  return (
    <div
      className={`min-h-screen bg-gradient-to-br from-lime-100 to-green-200 pt-16`}
    >
      <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Tab />
        </div>
    </div>
  );
};

export default DashBoard;
