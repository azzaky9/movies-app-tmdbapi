import {
  LocalFireDepartmentOutlined,
  AccessAlarmOutlined,
  YouTube,
  SubscriptionsOutlined,
  SettingsOutlined,
  LogoutOutlined,
} from "@mui/icons-material";

export const menuItems = [
  {
    names: "Menu",
    childList: [
      {
        name: "Discover",
        path: "/home/discover",
        icons: <YouTube />,
      },
      {
        name: "Top 10 Movies",
        path: "/home/top movies",
        icons: <LocalFireDepartmentOutlined />,
      },
      {
        name: "Coming Soon",
        path: "home/coming soon",
        icons: <AccessAlarmOutlined />,
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
        path: "/playlist",
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

// export const lists: { text: string; path: string }[] = [
//   {
//     text: "Home",
//     path: "/",
//   },
//   {
//     text: "TV Show",
//     path: "/tv-show",
//   },
//   {
//     text: "Movie",
//     path: "/movie",
//   },
//   {
//     text: "Anime",
//     path: "/anime",
//   },
// ];
