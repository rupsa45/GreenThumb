export default function Footer() {
    return (
      <footer className="bg-gradient-to-br from-lime-500/80 to-green-600/80 text-white py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; 2023 WeatherWise. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" className="hover:underline">Privacy Policy</a> | 
            <a href="#" className="hover:underline ml-2">Terms of Service</a>
          </p>
        </div>
      </footer>
    )
  }
  