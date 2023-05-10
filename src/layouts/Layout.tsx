import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='w-full flex relative'>
      <Sidebar />
      <div className='flex flex-col w-full'>
        <Navbar />
        {children}
      </div>
    </div>
  );
};

export default Layout;
