import axios from 'axios';
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const  signup =async(
    name,
    email,
    city,
    state,
    password)=>{
    try {
        const res =await  axios.post(`${API_BASE_URL}/users/signup`,{
            name,
            email,
            city,
            state,
            password
        },{ withCredentials: true })
        console.log("Signup successful", res.data);
        return res.data;
    } catch (error) {
        console.error("Signup failed", error);
    }
}

export const login = async (email, password) => {
    try {
        const res = await axios.post(`${API_BASE_URL}/users/login`, {
            email,
            password
        }, { withCredentials: true });
        //console.log("Login successful", res.data);
        return res.data;
    } catch (error) {
        console.error("Login failed", error);
    }
}
export const getUserData = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/users/profile`, {
        withCredentials: true,
      });
      return response.data.user;
    } catch (error) {
      console.error("Failed to fetch user data", error);
    }
  };


