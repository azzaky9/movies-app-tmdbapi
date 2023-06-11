import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import HomeComponent from "@/components/HomeComponent";

const Layout = () => {
  const location = useLocation();
  const currentLocation = location.pathname;

  return (
    <div className='w-full flex relative'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Navbar />
        {currentLocation === "/" ? <HomeComponent /> : <Outlet />}
      </div>
    </div>
  );
};

export default Layout;
