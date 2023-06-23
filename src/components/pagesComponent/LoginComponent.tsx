import { useState, useContext } from "react";
import Brands from "../common/Sidebar/Brands";
import InputGroups from "../common/FormUtils/InputGroups";
import { LoadingButton } from "@mui/lab";
import { Login } from "@mui/icons-material";
import { useAuthenticateRequest } from "@/hooks/useAuthenticate";
import InfiniteScrol from "@/lib/InfiniteScrol";
import { MoviesContext } from "@/context/MoviesContext";
import { styled } from "@mui/material";
import Accordion from "@/components/ui/Accordion";

export type TAutenticateData = {
  username: string;
  password: string;
};

const PrimaryButton = styled(LoadingButton)({
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
});

const LoginComponent = () => {
  const { loginWithAuthenticate, isRequestDone } = useAuthenticateRequest();
  const [authenticateData, setAuthenticateData] = useState({
    username: "",
    password: "",
  });

  const { popularMovies } = useContext(MoviesContext);

  const { username, password } = authenticateData;

  const handleSubmit = () => loginWithAuthenticate(username, password);

  return (
    <div className='w-full overflow-hidden h-screen grid place-content-center bg-gradient-to-br from-slate-950 via-zinc-950 to-slate-950 relative'>
      <InfiniteScrol dataPoster={popularMovies} />
      <InfiniteScrol
        reverse
        dataPoster={popularMovies}
      />
      <InfiniteScrol dataPoster={popularMovies} />
      <div className='absolute w-full h-screen grid grid-cols-2 place-content-center'>
        <Accordion />
        <div className='bg-input-only w-[390px] py-20 h-fit p-10 flex flex-col justify-center gap-10 place-self-center shadow-lg shadow-input-only '>
          <Brands size='large' />
          <InputGroups
            setValue={setAuthenticateData}
            value={authenticateData}
          />
          <PrimaryButton
            loadingPosition='end'
            endIcon={<Login />}
            loading={isRequestDone}
            onClick={handleSubmit}
            variant='contained'
            size='large'>
            <span>{isRequestDone ? "Request ..." : "Login"} </span>
          </PrimaryButton>
          <p className='text-sm text-secondary text-center'>
            not already have account please{" "}
            <a
              target='_blank'
              href='https://www.themoviedb.org/signup'
              className='text-blue-500 text-opacity-80 hover:text-opacity-100'>
              sign up{" "}
            </a>
            ?
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
