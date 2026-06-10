import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="text-2xl font-bold text-indigo-600"
          >
            BlogApp
          </Link>

          {user ? (
            <>
              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                <Link to="/" className="text-gray-700 hover:text-indigo-600">
                  Home
                </Link>

                <Link
                  to="/blogs"
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Blogs
                </Link>

                <Link
                  to="/create"
                  className="text-gray-700 hover:text-indigo-600"
                >
                  Write Post
                </Link>

                <Link
                  to="/about"
                  className="text-gray-700 hover:text-indigo-600"
                >
                  About
                </Link>

                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  Logout
                </button>
              </div>

              {/* Mobile Hamburger */}
              <button
                className="md:hidden text-3xl"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                ☰
              </button>
            </>
          ) : (
            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-indigo-600"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Register
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {user && menuOpen && (
          <div className="md:hidden flex flex-col gap-4 py-4 border-t">
            <Link to="/" onClick={() => setMenuOpen(false)}>
              Home
            </Link>

            <Link to="/blogs" onClick={() => setMenuOpen(false)}>
              Blogs
            </Link>

            <Link to="/create" onClick={() => setMenuOpen(false)}>
              Write Post
            </Link>

            <Link to="/about" onClick={() => setMenuOpen(false)}>
              About
            </Link>

            <button
              onClick={handleLogout}
              className="text-red-600  rounded w-25 flex"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;