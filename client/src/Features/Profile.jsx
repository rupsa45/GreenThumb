
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { MapPin, Mail, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getUserData } from '../apis/user.api';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    city: "",
    state: "",
  });
  
 useEffect(()=>{
     const fetchProfile = async () => {
       try {
         const res = await getUserData();
         if (res) {
          setFormData(res)
        } else {
          console.error("No user data received.");
        }
       } catch (error) {
         console.error("Failed to fetch user data", error);
       }
     }
     fetchProfile();
   },[])
   return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-yellow-50 py-12">
      <div className="container mx-auto px-4">
        <Card className="max-w-md mx-auto border-green-200 shadow-lg overflow-hidden">
          <div className="bg-gradient-to-r from-green-400 to-yellow-400 h-24"></div>
          <CardHeader className="relative">
            <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 w-24 h-24 bg-white rounded-full border-4 border-white shadow-lg flex items-center justify-center">
              <User size={48} className="text-green-600" />
            </div>
          </CardHeader>
          <CardContent className="pt-16">
            <CardTitle className="text-2xl font-bold text-center text-green-800 mb-6">
            {formData.name}
            </CardTitle>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 bg-green-100 p-3 rounded-md">
                <Mail className="text-green-600 flex-shrink-0" />
                <span className="text-green-800 truncate">{formData.email}</span>
              </div>
              <div className="flex items-center space-x-3 bg-yellow-100 p-3 rounded-md">
                <MapPin className="text-yellow-600 flex-shrink-0" />
                <span className="text-yellow-800">
                {formData.state}, {formData.city}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

};

export default Profile;