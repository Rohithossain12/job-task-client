import { FaMoon, FaSun } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom"; // Use NavLink for active link styling
import useAuth from "../hooks/useAuth";
import { useState } from "react";
import toast from "react-hot-toast";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { handleToggleTheme, users, logOut } = useAuth(); // Assuming user and handleLogout are in useAuth

  const handleThemeToggle = () => {
    handleToggleTheme();
    setIsDarkMode(!isDarkMode);
  };

  const handleLogout = () => {
    logOut()
      .then(() => {
        toast.success("Logout Successfully");
      })
      .catch(() => {
        toast.error("logout Unsuccessfully");
      });
  };

  return (
    <div className="bg-base-100 shadow-sm sticky top-0 z-50">
      <div className="navbar container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className=" lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-40 p-4 shadow-lg"
            >
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive ? "text-yellow-500" : "text-black"
                  }
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive ? "text-yellow-500" : "text-black"
                  }
                >
                  Dashboard
                </NavLink>
              </li>
            </ul>
          </div>
          <Link to="/">
            <h2 className="text-lg md:text-xl font-bold text-accent md:ml-0 ml-2">
              TaskFlow
            </h2>
          </Link>
        </div>

        <div className="navbar-end flex gap-3">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `text-black hidden md:block ${isActive ? "text-yellow-500" : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `text-black hidden md:block ${isActive ? "text-yellow-500" : ""}`
            }
          >
            Dashboard
          </NavLink>

          {/* Theme toggle button */}
          <button
            onClick={handleThemeToggle}
            className="text-xl hover:text-gray-400"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* Conditional user image and logout button */}
          {users ? (
            <>
              <img
                className="h-10 w-10 rounded-full border border-gray-400"
                src={users?.photoURL}
                alt="User"
              />
              <button onClick={handleLogout} className="btn ">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
