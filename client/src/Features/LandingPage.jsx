import {
  Sprout,
  Leaf,
  Globe,
  ThumbsUp,
} from "lucide-react";
import { Link } from "react-router-dom";
const CropRecommendationLanding = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation Bar */}
      <nav className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <ThumbsUp className="h-8 w-8 text-green-600" />
              <span className="ml-2 text-xl font-bold text-green-800">
                GreenThumb
              </span>
            </div>
            {/* <div className="hidden md:flex items-center space-x-8">
              <a href="#" className="text-gray-600 hover:text-green-600">Home</a>
              <a href="#" className="text-gray-600 hover:text-green-600">About Us</a>
              <a href="#" className="text-gray-600 hover:text-green-600">Products</a>
              <a href="#" className="text-gray-600 hover:text-green-600">Resources</a>
              <a href="#" className="text-gray-600 hover:text-green-600">Contact</a>
            </div> */}
            <div className="flex items-center space-x-4">
              {/* <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-800 px-4 py-2 rounded-md">
                Book A Demo
              </button> */}
              <Link to={"/weather"}>
                <button className="border border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-4 py-2 rounded-md">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">AI-Powered</span>
                  <span className="block text-green-600">
                    Crop Recommendation System
                  </span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Unlock the power of intelligent farming with our advanced crop
                  recommendation system. Make data-driven decisions for optimal
                  yield and sustainable agriculture.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    {/* <button className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 md:py-4 md:text-lg md:px-10">
                      Request a Demo
                    </button> */}
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-green-600 font-semibold tracking-wide uppercase">
              Features
            </h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Smart Farming Solutions
            </p>
          </div>

          <div className="mt-10">
            <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 ">
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow  hover:shadow-lg transition-shadow">
                <Globe className="h-12 w-12 text-green-600" />
                <h3 className="mt-5 text-lg font-medium text-gray-900">
                  Easy-to-Use Interface
                </h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Simplified, user-friendly design ensures you can quickly
                  access weather information with minimal effort.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow  hover:shadow-lg transition-shadow">
                <Globe className="h-12 w-12 text-green-600" />
                <h3 className="mt-5 text-lg font-medium text-gray-900">
                  Geospatial Analytics
                </h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Detailed field mapping and location-based recommendations for
                  better planning.
                </p>
              </div>

              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow  hover:shadow-lg transition-shadow">
                <Sprout className="h-12 w-12 text-green-600" />
                <h3 className="mt-5 text-lg font-medium text-gray-900">
                  Soil Composition Insights
                </h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Detailed soil nutrient analysis and region-specific soil
                  recommendations for optimized crop planning.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow  hover:shadow-lg transition-shadow">
                <Sprout className="h-12 w-12 text-green-600" />
                <h3 className="mt-5 text-lg font-medium text-gray-900">
                  Crop Knowledge Hub
                </h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Comprehensive crop information with seasonal insights for
                  informed decision-making.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow  hover:shadow-lg transition-shadow">
                <Sprout className="h-12 w-12 text-green-600" />
                <h3 className="mt-5 text-lg font-medium text-gray-900">
                  Reliable Forecasts
                </h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  A 5-day weather forecast helps you plan ahead for farming
                  activities like planting, watering, or harvesting.
                </p>
              </div>
              <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow  hover:shadow-lg transition-shadow">
                <Leaf className="h-12 w-12 text-green-600" />
                <h3 className="mt-5 text-lg font-medium text-gray-900">
                  Accurate Weather Insights
                </h3>
                <p className="mt-2 text-base text-gray-500 text-center">
                  Get precise, real-time weather updates tailored to your
                  location to make informed agricultural decisions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-green-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            {/* <span className="block text-yellow-400">Get your free trial today.</span> */}
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to={"/register"}>
                <button className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-yellow-400 hover:bg-yellow-500">
                  Get Started
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropRecommendationLanding;
