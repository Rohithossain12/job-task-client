import { FaMoon, FaSun } from "react-icons/fa";
import useAuth from "../hooks/useAuth";
import { useState } from "react";

const Navbar = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { handleToggleTheme } = useAuth();



  const handleThemeToggle = () => {
    handleToggleTheme();
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className="bg-base-100 shadow-sm">
      <div className="navbar  container mx-auto">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {" "}
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />{" "}
              </svg>
            </div>
            <ul
              tabIndex={0}
              class="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
            >
              <li>
                <a>Item 1</a>
              </li>
            </ul>
          </div>
          <h2>TaskFlow</h2>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>Item 1</a>
            </li>
          </ul>
        </div>
        <div className="navbar-end flex gap-5">
          <button
            onClick={handleThemeToggle}
            className="text-xl hover:text-gray-400"
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>
          <a className="btn">Button</a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
