import Brands from "./common/Sidebar/Brands";
import InputGroups from "./common/FormUtils/InputGroups";
import InfiniteScrol from "../lib/InfiniteScrol";
import { Button } from "@mui/material";

const LoginComponent = () => {
  return (
    <div className='w-full h-screen grid grid-cols-2'>
      <InfiniteScrol />
      <div className='bg-input-only w-[428px] h-fit p-10 flex flex-col justify-center items-center gap-10 place-self-center'>
        <h2 className='text-secondary text-2xl font-semibold'>Login</h2>
        <Brands size='large' />
        <InputGroups />
        <Button
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
