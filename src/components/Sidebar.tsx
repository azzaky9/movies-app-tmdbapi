import { menuItems } from "./common/ItemLoop/items";
import Menu from "./common/Sidebar/Menu";
import Brands from "./common/Sidebar/Brands";
import Logo from "/navbar-logo.svg";
import { useState } from "react";
import { MenuOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Sidebar = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  function toggleSidebar() {
    setSidebarOpen(!isSidebarOpen);
  }

  return (
    <div
      className={`relative p-only-sidebar block w-[245px] h-screen bg-black border-r-secondary border-opacity-5 border-r-2 transform ${
        isSidebarOpen ? "translate-x-60" : null
      }  animate-translate-x-all ease-in-out  duration-300 z-10
      sm:absolute
      sm:-left-60
      md:-left-60
      md:absolute
      `}>
      <div className='absolute -right-[2.9rem] hidden sm:block md:block'>
        <IconButton
          size='large'
          color='neutral'
          onClick={toggleSidebar}>
          <MenuOutlined />
        </IconButton>
      </div>
      <Brands urlLogo={Logo} />
      <Menu menuList={menuItems} />

      {/* <MenuOutlined sx={{ position: "absolute", top: 30, right: -40 }} /> */}
    </div>
  );
};

export default Sidebar;
