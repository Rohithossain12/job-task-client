import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaHome, FaTasks, FaBars, FaSignOutAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { users } = useAuth();

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isOpen ? "w-64" : "w-16"
        } bg-gray-800 text-white h-full transition-all duration-300 flex flex-col fixed left-0 top-0 z-50`}
      >
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-4 focus:outline-none"
        >
          <FaBars size={20} />
        </button>

        <nav className="flex flex-col flex-grow mt-4 space-y-4">
          <Link
            to="/dashboard/tasks"
            className="flex items-center px-4 py-2 hover:bg-yellow-600"
          >
            <FaTasks className="mr-2" />
            {isOpen && "Tasks"}
          </Link>
          <Link
            to="/"
            className="flex items-center px-4 py-2 hover:bg-yellow-600"
          >
            <FaHome className="mr-2" />
            {isOpen && "Home"}
          </Link>
        </nav>

        <div className="mt-auto">
          <Link
            to="/login"
            className="flex items-center px-4 py-2 hover:bg-yellow-600"
          >
            <FaSignOutAlt className="mr-2" />
            {isOpen && "Logout"}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 ml-16 md:ml-55 transition-all duration-300">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
