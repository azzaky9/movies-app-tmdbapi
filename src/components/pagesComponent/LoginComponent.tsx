import { useState, useCallback, useEffect } from "react";
import Brands from "../common/Sidebar/Brands";
import InputGroups from "../common/FormUtils/InputGroups";
import { LoadingButton } from "@mui/lab";
import { Login } from "@mui/icons-material";
import { useAuthenticateRequest } from "@/hooks/useAuthenticate";
import InfiniteScrol from "@/lib/InfiniteScrol";
import axios, { AxiosResponse } from "axios";
import { StructuredReponseSource } from "@/types";

export type TAutenticateData = {
  username: string;
  password: string;
};

const LoginComponent = () => {
  const { loginWithAuthenticate, isRequestDone } = useAuthenticateRequest();
  const [authenticateData, setAuthenticateData] = useState({
    username: "",
    password: "",
  });

  const key = import.meta.env.VITE_API_KEY;
  const [marqueeMovie, setMarqueMovie] = useState<StructuredReponseSource[]>([]);

  const endpoints = [
    `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=3`,
    `https://api.themoviedb.org/3/movie/popular?api_key=${key}&language=en-US&page=2`,
  ];

  const fetchAll = useCallback(async () => {
    const mappingEndpoint = endpoints.map((endpoint) => axios.get(endpoint));

    const source: AxiosResponse<{ results: StructuredReponseSource[] }>[] = await Promise.all(
      mappingEndpoint
    );

    setMarqueMovie(source[0].data.results);
  }, []);

  const { username, password } = authenticateData;

  const handleSubmit = () => loginWithAuthenticate(username, password);

  useEffect(() => {
    fetchAll();
  }, []);

  return (
    <div className='w-full overflow-hidden h-screen grid place-content-center bg-gradient-to-br from-slate-950 via-zinc-950 to-slate-950 relative'>
      <InfiniteScrol dataPoster={marqueeMovie} />
      <InfiniteScrol
        reverse
        dataPoster={marqueeMovie}
      />
      <InfiniteScrol dataPoster={marqueeMovie} />
      <div className='bg-input-only w-[390px] py-20 h-fit p-10 flex flex-col justify-center gap-10 place-self-center shadow-lg shadow-input-only absolute'>
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
