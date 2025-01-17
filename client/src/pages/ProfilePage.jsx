import Profile from '../Features/Profile'
import Navbar from "../Layout/Navbar";
const ProfilePage = () => {
  return (
    <div className={`min-h-screen bg-gradient-to-br from-lime-100 to-green-200 pt-16`}>
      <Navbar/>
      <Profile/>
    </div>
  );
};

export default ProfilePage;
