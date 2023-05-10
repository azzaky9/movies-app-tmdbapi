import { menuItems } from "./common/ItemLoop/items";
import Menu from "./common/Sidebar/Menu";
import Brands from "./common/Sidebar/Brands";
import Logo from "/navbar-logo.svg";

const Sidebar = () => {
  return (
    <div
      className='p-only-sidebar block w-[245px] h-screen border-r-secondary border-opacity-5 border-r-2  
      sm:absolute
      sm:-left-10'>
      <Brands urlLogo={Logo} />
      <Menu menuList={menuItems} />

      {/* <MenuOutlined sx={{ position: "absolute", top: 30, right: -40 }} /> */}
    </div>
  );
};

export default Sidebar;
