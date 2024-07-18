import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Train, Home, BookOpen, LogIn, LogOut, Menu, X } from "lucide-react";
import { toast } from "react-toastify";

export const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    navigate("/login");
    toast.success("Logout successfully");
  };

  const isLoggedIn = !!localStorage.getItem("token");

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-blue-600 to-blue-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/user" className="flex items-center">
              <Train className="h-8 w-8 text-white mr-2" />
              <span className="font-bold text-xl text-white">
                Train Booking
              </span>
            </Link>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink to="/" icon={<Home className="h-5 w-5" />}>
                Home
              </NavLink>
              {isLoggedIn && (
                <NavLink
                  to="/mybooking"
                  icon={<BookOpen className="h-5 w-5" />}
                >
                  My Booking
                </NavLink>
              )}
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
                >
                  <LogOut className="h-5 w-5 mr-1" />
                  Logout
                </button>
              ) : (
                <NavLink to="/login" icon={<LogIn className="h-5 w-5" />}>
                  Login
                </NavLink>
              )}
            </div>
          </div>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <MobileNavLink to="/" icon={<Home className="h-5 w-5 mr-1" />}>
              Home
            </MobileNavLink>
            {isLoggedIn && (
              <MobileNavLink
                to="/mybooking"
                icon={<BookOpen className="h-5 w-5 mr-1" />}
              >
                My Booking
              </MobileNavLink>
            )}
            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
            ) : (
              <MobileNavLink
                to="/login"
                icon={<LogIn className="h-5 w-5 mr-1" />}
              >
                Login
              </MobileNavLink>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

const NavLink = ({ to, children, icon }) => (
  <Link
    to={to}
    className="text-white hover:bg-blue-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
  >
    {icon}
    <span className="ml-1">{children}</span>
  </Link>
);

const MobileNavLink = ({ to, children, icon }) => (
  <Link
    to={to}
    className="text-white hover:bg-blue-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium flex items-center"
  >
    {icon}
    <span className="ml-1">{children}</span>
  </Link>
);

export default Navbar;
