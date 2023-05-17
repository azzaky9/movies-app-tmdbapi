import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Layout = () => {
  return (
    <div className='w-full flex relative'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Navbar />
        <Outlet />
      </div>
    </div>
  );
};

export default Layout;
