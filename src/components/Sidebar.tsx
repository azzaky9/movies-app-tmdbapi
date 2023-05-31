import { menuItems } from "./objects-variables/items";
import Menu from "./common/Sidebar/Menu";
import Brands from "./common/Sidebar/Brands";
import { MenuOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";

const Sidebar = () => {
  return (
    <div
      className={`relative p-only-sidebar md:hidden w-[245px] h-full  border-r-secondary border-opacity-5 border-r-2 `}>
      <div className='absolute top-6 -right-[2.9rem] hidden sm:block md:block'>
        <IconButton
          size='large'
          color='neutral'>
          <MenuOutlined />
        </IconButton>
      </div>
      <Brands />
      <Menu menuList={menuItems} />
    </div>
  );
};

export default Sidebar;
