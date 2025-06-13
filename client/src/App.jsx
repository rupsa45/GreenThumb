import { Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import LandingPage from "./Features/LandingPage";
import DetailPage from "./pages/DetailPage";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/weather" element={<DashBoard />} />
        <Route path="/crop-detail/:crop" element={<DetailPage />} />
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default App;
