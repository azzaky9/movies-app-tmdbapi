import { useState } from "react";
import { RouterProvider } from "react-router-dom";
import { route } from "@/route";
import { useMediaQuery, Snackbar, Alert, Slide, IconButton } from "@mui/material";
import { Close, WarningAmberOutlined } from "@mui/icons-material";

function App() {
  const [isOpen, setIsOpen] = useState(true);
  const isDeviceDesktop = useMediaQuery("(min-width: 1000px)");
  const isDeviceMobile = useMediaQuery("(max-width: 500px");

  const handleClose = () => {
    setIsOpen(false);
  };

  const CancelRenderComponent = () => {
    return (
      <div className='w-screen h-screen grid place-items-center place-content-center gap-2'>
        <WarningAmberOutlined
          color='warning'
          sx={{ fontSize: "3rem" }}
        />
        <code className='w-[78%] text-center'>
          Im sorry but this Web only on Tablet or Desktop{" "}
        </code>
      </div>
    );
  };

  if (isDeviceMobile) {
    return <CancelRenderComponent />;
  }

  return (
    <>
      <Snackbar
        anchorOrigin={{ horizontal: "right", vertical: "top" }}
        open={!isDeviceDesktop && isOpen}
        autoHideDuration={6000}
        TransitionComponent={Slide}
        onClose={handleClose}>
        <Alert severity='info'>
          Try To Use Desktop Ratio With Better Experience
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={handleClose}>
            <Close fontSize='small' />
          </IconButton>
        </Alert>
      </Snackbar>
      <RouterProvider router={route} />
    </>
  );
}

export default App;
