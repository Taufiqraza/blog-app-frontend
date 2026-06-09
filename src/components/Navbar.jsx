import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate('/login');
  }
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

            <div className="hidden md:flex items-center gap-8">

              <Link
                to="/"
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                Home
              </Link>

              <Link
                to="/blogs"
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                Blogs
              </Link>

              <Link
                to="/create"
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                Write Post
              </Link>

              <Link
                to="/about"
                className="text-gray-700 hover:text-indigo-600 font-medium transition"
              >
                About
              </Link>

              <Link
                onClick={handleLogout}
                className="text-gray-200 hover:text-gray-100 bg-red-700 font-medium transition rounded p-2"
              >
                Logout
              </Link>
            </div>
          ) : (

            <div className="flex items-center gap-3">
              <Link
                to="/login"
                className="px-4 py-2 text-gray-700 font-medium hover:text-indigo-600 transition"
              >
                Login
              </Link>

              <Link
                to="/register"
                className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
              >
                Register
              </Link>
            </div>)}
        </div>
      </div>
    </nav >
  )
}

export default Navbar
