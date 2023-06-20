import { useState } from "react";
import Brands from "./common/Sidebar/Brands";
import InputGroups from "./common/FormUtils/InputGroups";
import { LoadingButton } from "@mui/lab";
import { Login } from "@mui/icons-material";
import { useAuthenticateRequest } from "@/hooks/useAuthenticate";

export type TAutenticateData = {
  username: string;
  password: string;
};

const LoginComponent = () => {
  // const { fetchAllRequirementEndpoint } = useAuthenticateRequest();
  const { loginWithAuthenticate, isRequestDone, getErrorMessage } = useAuthenticateRequest();
  const errMessage = getErrorMessage();
  const [authenticateData, setAuthenticateData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = authenticateData;

  const handleSubmit = () => loginWithAuthenticate(username, password);

  return (
    <div className='w-full h-screen grid grid-cols-2'>
      <div className='bg-input-only w-[390px] py-20 h-fit p-10 flex flex-col justify-center gap-10 place-self-center '>
        <Brands size='large' />

        <InputGroups
          setValue={setAuthenticateData}
          value={authenticateData}
        />
        <LoadingButton
          loadingPosition='end'
          endIcon={<Login />}
          loading={isRequestDone}
          onClick={handleSubmit}
          variant='contained'
          size='large'
          sx={{
            textTransform: "capitalize",
            color: "#000",
            backgroundColor: "rgba(249, 181, 70, 0.989)",
            "&:hover": {
              backgroundColor: "rgba(249, 181, 70, 0.890)",
            },
            "&:disabled": {
              color: "white",
              backgroundColor: "rgba(255, 255, 255, 0.128)",
            },
          }}>
          <span>{isRequestDone ? "Request ..." : "Login"} </span>
        </LoadingButton>
        <p className='text-sm text-secondary text-center'>
          not already have account please{" "}
          <a
            href=''
            className='text-blue-500 text-opacity-80 hover:text-opacity-100'>
            sign up{" "}
          </a>
          ?
        </p>
      </div>
    </div>
  );
};

export default LoginComponent;
