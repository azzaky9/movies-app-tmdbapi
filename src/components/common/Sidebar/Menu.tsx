import { Link, useLocation } from "react-router-dom";
import { menuItems } from "@/components/objects-variables/items";

const Menu = () => {
  const { pathname } = useLocation();
  console.log(pathname);

  return (
    <div className='mt-[30px] flex flex-col gap-[40px]'>
      {menuItems.map(({ names, childList }, index) => (
        <ul key={index}>
          <h3 className='text-lg mb-5'>{names}</h3>
          <div className='flex flex-col gap-[26px]'>
            {childList.map(({ name, path, icons }) => (
              <li
                className={`flex gap-3 hover-link  ${
                  pathname === path ? "text-accent" : "text-secondary"
                }`}
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
