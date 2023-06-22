import { useSnackbar } from "notistack";
import HomeComponent from "../components/HomeComponent";
import Logout from "@/components/Logout";
import { useAuthenticateRequest } from "@/hooks/useAuthenticate";
import { useEffect } from "react";

const HomePage = ({ location }: { location: string }) => {
  const { enqueueSnackbar } = useSnackbar();
  const { getCurrentUser } = useAuthenticateRequest();
  const user = getCurrentUser();

  useEffect(() => {
    if (user)
      enqueueSnackbar(`Good To see you ${user?.name ? user?.name : user?.username}`, {
        variant: "info",
      });
  }, []);

  return (
    <>
      {location === "/logout" ? <Logout /> : null}
      <HomeComponent />
    </>
  );
};

export default HomePage;
