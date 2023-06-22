import Menu from "../common/Sidebar/Menu";
import Brands from "../common/Sidebar/Brands";
import { MenuOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { useToggle } from "../../hooks/useToggle";

const Sidebar = () => {
  const { isOpen, setIsOpen } = useToggle();

  const renderClassDynamically = `relative p-only-sidebar w-[245px] z-40 border-r-secondary border-opacity-5 border-r-2 transition-all duration-300 
    md:bg-primary md:absolute md:h-full  ${isOpen ? "md:-left-[0]" : "md:-left-[34.499%]"}
  `;

  const BlurredDisplay = () => {
    return (
      <div
        onClick={handleToggle}
        className='absolute h-full w-full z-30 opacity-70 bg-primary'></div>
    );
  };

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {isOpen ? <BlurredDisplay /> : null}
      <div className={renderClassDynamically}>
        <div
          onClick={handleToggle}
          className='absolute top-[1.8rem] -right-[3.9rem] hidden sm:block md:block '>
          <IconButton
            size='large'
            color='neutral'>
            <MenuOutlined />
          </IconButton>
        </div>
        <Brands />
        <Menu />
      </div>
    </>
  );
};

export default Sidebar;
