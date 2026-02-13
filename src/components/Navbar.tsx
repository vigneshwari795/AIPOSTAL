import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import authService from '../services/authService';

function Navbar() {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const isAuth = await authService.isAuthenticated();
      setIsAuthenticated(isAuth);
    };
    checkAuth();

    const handleAuthChange = () => {
      checkAuth();
    };

    window.addEventListener('auth-change', handleAuthChange);
    return () => window.removeEventListener('auth-change', handleAuthChange);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event('auth-change'));
    setIsAuthenticated(false);
    navigate('/');
  };

  return (
    <>
      <nav className="bg-[#111F35] border-b-2 border-[#F63049] sticky top-0 z-50 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Title */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-[#F63049] to-[#D02752] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">AI</span>
              </div>
              <span className="text-white font-bold text-lg hidden sm:block">
                AI Delivery Tracker
              </span>
            </Link>

            {/* Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <Link
                to="/"
                className="text-gray-300 hover:text-[#F63049] transition-colors duration-200 font-medium"
              >
                Home
              </Link>
              <Link
                to="/book"
                className="text-gray-300 hover:text-[#F63049] transition-colors duration-200 font-medium"
              >
                Book Parcel
              </Link>
              <Link
                to="/track"
                className="text-gray-300 hover:text-[#F63049] transition-colors duration-200 font-medium"
              >
                Track Parcel
              </Link>
              <Link
                to="/login"
                className="text-gray-300 hover:text-[#F63049] transition-colors duration-200 font-medium"
              >
                Dashboard
              </Link>
            </div>

            {/* Login/Logout Button */}
            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <button
                  onClick={handleLogout}
                  className="bg-transparent border border-[#F63049] text-[#F63049] hover:bg-[#F63049] hover:text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="bg-[#F63049] hover:bg-[#D02752] text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  Login
                </Link>
              )}

              {/* Mobile Menu Button - simplified for brevity, assume existing SVG logic */}
              <button className="md:hidden text-gray-300 hover:text-[#F63049] focus:outline-none">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          {/* Mobile Navigation - Hidden by default, can be toggled */}
          <div className="md:hidden pb-4 pt-2 space-y-2">
            <Link
              to="/"
              className="block text-gray-300 hover:text-[#F63049] hover:bg-[#8A244B] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/book"
              className="block text-gray-300 hover:text-[#F63049] hover:bg-[#8A244B] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-200"
            >
              Book Parcel
            </Link>
            <Link
              to="/track"
              className="block text-gray-300 hover:text-[#F63049] hover:bg-[#8A244B] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-200"
            >
              Track Parcel
            </Link>
            {isAuthenticated ? (
              <button
                onClick={handleLogout}
                className="block w-full text-left text-gray-300 hover:text-[#F63049] hover:bg-[#8A244B] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-200"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="block text-gray-300 hover:text-[#F63049] hover:bg-[#8A244B] hover:bg-opacity-20 px-3 py-2 rounded-md transition-colors duration-200"
              >
                Dashboard
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;