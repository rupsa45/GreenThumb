import { Link, useParams } from "react-router-dom";
import { CircleUserRound, ThumbsUp, Search, Menu, X } from "lucide-react";

const DashBoardNavbar = () => {
    const {crop}=useParams();
   return (
    <div className="top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to={`/weather`}>
              <div className="flex items-center">
                <span className="ml-2 text-xl font-bold text-green-800">
                  👈 Get back to the Dashboard
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashBoardNavbar
