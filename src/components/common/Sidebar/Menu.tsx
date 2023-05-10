import { Link } from "react-router-dom";
import React from "react";

interface ListMenuTypes {
  menuList: {
    names: string;
    childList: {
      name: string;
      path: string;
      icons: JSX.Element;
    }[];
  }[];
}

const Menu: React.FC<ListMenuTypes> = ({ menuList }) => {
  return (
    <div className='mt-[30px] flex flex-col gap-[40px]'>
      {menuList.map(({ names, childList }, index) => (
        <ul key={index}>
          <h3 className='text-lg mb-5'>{names}</h3>
          <div className='flex flex-col gap-[26px]'>
            {childList.map(({ name, path, icons }) => (
              <li
                className='flex gap-3 text-secondary hover-link'
                key={name}>
                {icons}
                <Link
                  to={path}
                  className='text-base'>
                  {" "}
                  {name}
                </Link>
              </li>
            ))}
          </div>
        </ul>
      ))}
    </div>
  );
};

export default Menu;
