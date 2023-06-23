import { Link, useLocation } from "react-router-dom";

import {
  MovieCreation,
  YouTube,
  SubscriptionsOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

const Menu = () => {
  const menuItems = [
    {
      names: "Menu",
      childList: [
        {
          name: "Discover",
          path: "/",
          icons: <YouTube />,
        },
        {
          name: "Movies",
          path: "/movie/all",
          icons: <MovieCreation />,
        },
      ],
    },
    {
      names: "Library",
      childList: [
        {
          name: "Watch List",
          path: "/watchlist",
          icons: <SubscriptionsOutlined />,
        },
      ],
    },
    {
      names: "Settings",
      childList: [
        {
          name: "Account Settings",
          path: "/account",
          icons: <SettingsOutlined />,
        },
        {
          name: "Log Out",
          path: "/logout",
          icons: <LogoutOutlined />,
        },
      ],
    },
  ];

  const { pathname } = useLocation();

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
