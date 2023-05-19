import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import HomePage from "../pages/HomePage";

const Layout = () => {
  const location = useLocation();

  return (
    <div className='w-full flex relative'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Navbar />
        {location.pathname === "/" ? <HomePage /> : <Outlet />}
      </div>
    </div>
  );
};

export default Layout;
