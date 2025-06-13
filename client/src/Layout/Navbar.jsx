import { CircleUserRound, ThumbsUp, Search, Menu, X } from "lucide-react";
// import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { getUserData } from "../apis/user.api";


const Navbar = () => {
  // const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);
  // const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  // const [user, setUser] = React.useState(null);
  
  // const navigate = useNavigate();

   

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     try {
  //       const res = await getUserData();
  //       if (res && res.name) {
  //         setUser(res);
  //       } else {
  //         setUser(null);
  //       }
  //     } catch (error) {
  //       console.error("Failed to fetch user data", error);
  //       setUser(null);
  //     }
  //   };
  //   fetchProfile();
  // }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-lg shadow-sm">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-8">
            <Link to="/">
              <div className="flex items-center">
                <ThumbsUp className="h-8 w-8 text-green-600" />
                <span className="ml-2 text-xl font-bold text-green-800">
                  GreenThumb
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;