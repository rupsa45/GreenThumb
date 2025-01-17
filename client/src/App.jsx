import { Routes, Route } from "react-router-dom";
import DashBoard from "./pages/DashBoard";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import LandingPage from "./Features/LandingPage";
import PublicRoute from "./Protected/PublicRoute";
import ProtectedRoute from "./Protected/ProtectedRoute";
import ProfilePage from "./pages/ProfilePage";
import DetailPage from "./pages/DetailPage";
import CropDetails from "./Features/CropDetails";

const App = () => {
  return (
    <div>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/register"
          element={
            <PublicRoute>
              <SignUp />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}

        <Route
          path="/weather"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/crop-detail/:state/:crop"
          element={
            <ProtectedRoute>
              <CropDetails/>
            </ProtectedRoute>
          }
        />
        {/* Unprotected Routes */}
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </div>
  );
};

export default App;
