import  { useState } from 'react';
import {  CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Sprout } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../apis/user.api';
const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
   const navigate = useNavigate();
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
          const response= await login(formData.email,formData.password);
            const city = response.user.city;
            const state = response.user.state;
          if(response.success){
            localStorage.setItem("token", response.token);
            localStorage.setItem("city", city);
            localStorage.setItem("state", state);
            navigate("/weather");
            console.log("response:",response);     
          }else{
            throw new Error("Unexpected response format");
          }
        } catch (error) {
          console.log("error in login:",error);
        }
      };
    

    return (
        <div className="min-h-screen bg-white/50 flex items-center justify-center p-4">
            <div className="flex flex-row-reverse w-full max-w-5xl bg-white/90 rounded-lg shadow-lg overflow-hidden">
                {/* Quote Section */}
                <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-600 to-lime-500 p-12 flex-col justify-center text-white">
                    <Sprout className="w-12 h-12 mb-6" />
                    <blockquote className="text-2xl font-light mb-4">
                        Smart choices lead to thriving crops—log in to unlock the future of farming.
                    </blockquote>
                    <p className="text-lg opacity-90">
                        Make data-driven decisions for your farm's success with our AI-powered crop recommendations.
                    </p>
                </div>

                {/* Form Section */}
                <div className="w-full md:w-1/2 p-8">
                    <CardHeader className="space-y-1 text-center">
                        <CardTitle className="text-2xl font-bold text-green-600 flex items-center justify-center gap-2">
                            Welcome Back
                        </CardTitle>
                        <p className="text-sm text-gray-600">Login to your account</p>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Input
                                    name="email"
                                    type="email"
                                    placeholder="Email address"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="bg-white/50 border-lime-200 focus:border-lime-400 focus:ring-lime-400 transition-colors"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <Input
                                    name="password"
                                    type="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className="bg-white/50 border-lime-200 focus:border-lime-400 focus:ring-lime-400 transition-colors"
                                    required
                                />
                            </div>

                            <Button
                                type="submit"
                                className="w-full bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white transition-all duration-300 transform hover:scale-105 font-semibold"
                            >
                                Login
                            </Button>

                            <div className="relative my-4">
                                <div className="absolute inset-0 flex items-center">
                                    <span className="w-full border-t border-gray-300"></span>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                </div>
                            </div>

                            <Button
                                type="button"
                                className="w-full bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 transition-all duration-300 transform hover:scale-105 font-semibold flex items-center justify-center gap-2"
                                onClick={() => console.log('Google sign-in clicked')}
                            >
                                <svg className="w-5 h-5" viewBox="0 0 24 24">
                                    <path
                                        //fill="currentColor"
                                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        //fill="currentColor"
                                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        fill="#34A853"
                                    />
                                    <path
                                        //fill="currentColor"
                                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        //fill="currentColor"
                                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        fill="#EA4335"
                                    />
                                </svg>
                                Continue with Google
                            </Button>
                        </form>
                        <div className="mt-4 text-center text-sm text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-green-600 hover:text-green-700 font-medium">
                                Sign up
                            </Link>
                        </div>
                    </CardContent>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;