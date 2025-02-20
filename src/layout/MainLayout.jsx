import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const MainLayout = () => {
  return (
    <div>
      <Navbar></Navbar>
     <div className="min-h-[calc(100vh-120px)] container mx-auto px-5">
     <Outlet></Outlet>
     </div>
      <Footer></Footer>
    </div>
  );
};

export default MainLayout;
