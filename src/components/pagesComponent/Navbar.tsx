import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import { AppBar, Box, Toolbar, IconButton, Badge, MenuItem } from "@mui/material";
import Menu, { MenuProps } from "@mui/material/Menu";
import { Notifications, MoreVert, AutoAwesome, InfoOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import RoundedProfile from "@/components/common/utils/RoundedProfile";
import { useAuthenticateRequest } from "@/hooks/useAuthenticate";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    minWidth: 180,
    backgroundColor: "#131212",
    color: "white",
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      alignItems: "start",
      padding: "12px",
    },
    "& .MuiMenuItem-root": {
      width: "420px",
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.neutral.main,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(theme.palette.primary.main, theme.palette.action.selectedOpacity),
      },
    },
  },
}));

export default function PrimarySearchAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { getCurrentUser } = useAuthenticateRequest();
  const userSource = getCurrentUser();

  const isOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleClick = () => {
    if (userSource) {
      handleMenuClose();
      return navigate("/account");
    }
    navigate("/sign-in");
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <StyledMenu
      sx={{ width: "fit-content" }}
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isOpen && anchorEl?.id === "rounded-profile-button"}
      onClose={handleMenuClose}>
      <MenuItem onClick={handleClick}>{userSource ? "My Account" : "Login"}</MenuItem>
    </StyledMenu>
  );
  const notificationId = "notification-menu-id";
  const renderNotificationUser = (
    <StyledMenu
      id={notificationId}
      anchorEl={anchorEl}
      open={isOpen && anchorEl?.id === "notification-button"}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      onClose={handleMenuClose}>
      <MenuItem>How to use this app ?</MenuItem>
      <MenuItem sx={{ whiteSpace: "normal", fontSize: "14px", color: "rgba(255, 255, 255, 0.4)" }}>
        <AutoAwesome />
        Try to adding new watchlist movie you want, with click watchlist icons when you hover
        posters
      </MenuItem>
      <MenuItem sx={{ whiteSpace: "normal", fontSize: "14px", color: "rgba(255, 255, 255, 0.4)" }}>
        <InfoOutlined />
        Try to see detail movie with click play button on the movie poster, on their you can see
        Trailer, Similar Movie, etc...
      </MenuItem>
    </StyledMenu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}>
      <MenuItem>
        <IconButton
          size='large'
          aria-label='show 17 new notifications'
          color='inherit'>
          <Badge
            badgeContent={2}
            color='error'>
            <Notifications />
          </Badge>
        </IconButton>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size='large'
          aria-label='account of current user'
          aria-controls='primary-search-account-menu'
          aria-haspopup='true'
          color='inherit'>
          <RoundedProfile />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    <div className='flex  border-b-secondary border-opacity-5 border-b-2'>
      <AppBar
        position='static'
        color='transparent'
        sx={{ p: 2, boxShadow: "none" }}>
        <Toolbar sx={{ paddingLeft: "45px" }}>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            {userSource ? (
              <IconButton
                id='notification-button'
                onClick={handleProfileMenuOpen}
                size='large'
                color='inherit'>
                <Badge
                  badgeContent={2}
                  color='error'>
                  <Notifications />
                </Badge>
              </IconButton>
            ) : null}

            <IconButton
              id='rounded-profile-button'
              size='large'
              edge='end'
              aria-label='account of current user'
              aria-controls={menuId}
              aria-haspopup='true'
              onClick={handleProfileMenuOpen}
              color='inherit'>
              <RoundedProfile />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: "flex", md: "none" } }}>
            <IconButton
              size='large'
              aria-label='show more'
              aria-controls={mobileMenuId}
              aria-haspopup='true'
              onClick={handleMobileMenuOpen}
              color='inherit'>
              <MoreVert />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {userSource ? renderNotificationUser : null}
    </div>
  );
}
