import { NavLink } from "react-router-dom";
import SearchInput from "./common/Navbar/SearchInput";
import { IconButton } from "@mui/material";
import { Notifications } from "@mui/icons-material";
import UserProfile from "./common/Navbar/UserProfile";

const Navbar = () => {
  const lists: { text: string; path: string }[] = [
    {
      text: "Home",
      path: "/",
    },
    {
      text: "TV Show",
      path: "/tv-show",
    },
    {
      text: "Movie",
      path: "/movie",
    },
    {
      text: "Anime",
      path: "/anime",
    },
  ];

  return (
    <nav className='p-6 flex gap-8 items-center border-b-2 border-b-secondary border-opacity-5'>
      <div className='flex gap-[30px]'>
        {lists.map(({ text, path }, index) => (
          <NavLink
            to={path}
            key={index}
            className={`navbar-link text-secondary hover-link ${
              text === "TV Show" ? "w-[67px]" : ""
            } `}>
            {text}
          </NavLink>
        ))}
      </div>
      <SearchInput />
      <IconButton color='secondary'>
        <Notifications className='text-white' />
      </IconButton>

      <UserProfile />
    </nav>
  );
};

export default Navbar;
