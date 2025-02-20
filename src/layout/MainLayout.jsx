import { Outlet, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <div>
      {!isAuthPage && <Navbar />}

      <div className="min-h-[calc(100vh-120px)] container mx-auto px-5">
        <Outlet />
      </div>

      {!isAuthPage && <Footer />}
    </div>
  );
};

export default MainLayout;
