import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  const location = useLocation();

  // Hide Navbar & Footer on these routes
  const isExcludedPage =
    location.pathname.startsWith("/dashboard") ||
    location.pathname === "/login" ||
    location.pathname === "/register";

  return (
    <div>
      {!isExcludedPage && <Navbar />}

      <div className="min-h-[calc(100vh-120px)] container mx-auto px-5">
        <Outlet />
      </div>

      {!isExcludedPage && <Footer />}
    </div>
  );
};

export default MainLayout;
