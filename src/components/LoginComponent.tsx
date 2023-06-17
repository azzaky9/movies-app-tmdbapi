import { useState } from "react";
import Brands from "./common/Sidebar/Brands";
import InputGroups from "./common/FormUtils/InputGroups";
import InfiniteScrol from "../lib/InfiniteScrol";
import { Button } from "@mui/material";
import { useAuthenticateRequest } from "@/hooks/useAuthenticate";

export type TAutenticateData = {
  username: string;
  password: string;
};

const LoginComponent = () => {
  // const { fetchAllRequirementEndpoint } = useAuthenticateRequest();
  const { loginWithAuthenticate } = useAuthenticateRequest();
  const [authenticateData, setAuthenticateData] = useState<TAutenticateData>({
    username: "",
    password: "",
  });

  const { username, password } = authenticateData;

  const handleSubmit = () => loginWithAuthenticate(username, password);

  return (
    <div className='w-full h-screen grid grid-cols-2'>
      <InfiniteScrol />
      <div className='bg-input-only w-[428px] h-fit p-10 flex flex-col justify-center items-center gap-10 place-self-center'>
        <h2 className='text-secondary text-2xl font-semibold'>Login</h2>
        <Brands size='large' />
        <InputGroups
          setValue={setAuthenticateData}
          value={authenticateData}
        />
        <Button
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
          }}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default LoginComponent;
