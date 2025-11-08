// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, LogOut, Settings, Calendar } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Toggle for demo
  const [showDropdown, setShowDropdown] = useState(false);

  // Demo: Toggle login state
  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => {
    setIsLoggedIn(false);
    setShowDropdown(false);
  };

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-primary to-secondary rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">B</span>
            </div>
            <span className="text-xl font-bold text-gray-800 hidden sm:block">
              BookMyHotel
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-primary font-medium transition">
              Home
            </Link>
            <Link to="/hotels" className="text-gray-700 hover:text-primary font-medium transition">
              Hotels
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-primary font-medium transition">
              About
            </Link>
            <Link to="/contact" className="text-gray-700 hover:text-primary font-medium transition">
              Contact
            </Link>
          </div>

          {/* Auth Buttons / User Dropdown */}
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-2 text-gray-700 hover:text-primary transition"
                >
                  <div className="w-9 h-9 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center text-white font-semibold">
                    U
                  </div>
                  <span className="font-medium">Hi, User</span>
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden">
                    <Link
                      to="/dashboard"
                      className="flex items-center px-4 py-3 hover:bg-gray-50 transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Calendar className="w-4 h-4 mr-3 text-gray-600" />
                      <span className="text-sm font-medium">My Bookings</span>
                    </Link>
                    <Link
                      to="/profile"
                      className="flex items-center px-4 py-3 hover:bg-gray-50 transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      <User className="w-4 h-4 mr-3 text-gray-600" />
                      <span className="text-sm font-medium">Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center px-4 py-3 hover:bg-gray-50 transition"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Settings className="w-4 h-4 mr-3 text-gray-600" />
                      <span className="text-sm font-medium">Settings</span>
                    </Link>
                    <hr className="my-1" />
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-3 hover:bg-red-50 text-red-600 transition"
                    >
                      <LogOut className="w-4 h-4 mr-3" />
                      <span className="text-sm font-medium">Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-700 hover:text-primary font-medium transition"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-primary text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105"
                  onClick={handleLogin} // Demo login
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t">
            <div className="flex flex-col space-y-3">
              <Link to="/" className="text-gray-700 hover:text-primary font-medium py-2">
                Home
              </Link>
              <Link to="/hotels" className="text-gray-700 hover:text-primary font-medium py-2">
                Hotels
              </Link>
              <Link to="/about" className="text-gray-700 hover:text-primary font-medium py-2">
                About
              </Link>
              <Link to="/contact" className="text-gray-700 hover:text-primary font-medium py-2">
                Contact
              </Link>
              <hr className="my-2" />
              {isLoggedIn ? (
                <>
                  <Link to="/dashboard" className="text-gray-700 font-medium py-2">
                    My Bookings
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 font-medium py-2 text-left"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="text-gray-700 font-medium py-2">
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-primary text-white px-5 py-2 rounded-lg font-semibold text-center"
                    onClick={handleLogin}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}