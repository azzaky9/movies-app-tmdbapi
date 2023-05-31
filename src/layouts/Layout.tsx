import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage";

const Layout = () => {
  const location = useLocation();
  const currentLocation = location.pathname;

  return (
    <div className='w-full flex relative'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Navbar />
        {currentLocation === "/" ? <HomePage /> : <Outlet />}
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
