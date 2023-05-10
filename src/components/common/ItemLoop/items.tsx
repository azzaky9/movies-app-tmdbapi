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
    names: "Libary",
    childList: [
      {
        name: "Playlist",
        path: "/playlist",
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
        path: "/playlist",
        icons: <LogoutOutlined />,
      },
    ],
  },
];
