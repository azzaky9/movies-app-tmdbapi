import { useCallback, useContext, useState } from "react";
import { AuthContext, User } from "@/context/AuthContext";
import axios, { AxiosResponse, AxiosError } from "axios";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";

export type TConfigurationRequest<T> = {
  method: "GET" | "PUT" | "POST";
  url: string;
  headers: T;
};

interface TAuthWithUsernamePw {
  data: {
    username: string;
    password: string;
    request_token: string | null;
  };
}
type TAuthLogin<K> = TConfigurationRequest<K> & TAuthWithUsernamePw;

const useAuthenticateRequest = () => {
  const [isRequestDone, setIsRequestDone] = useState(false);
  const { setCurrentUser, setErrorMessage, setSession, logOut, value } = useContext(AuthContext);
  const { currentUser, error } = value;
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  type THeaderRequest = typeof headerRequest;

  const headerRequest = {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWMwNDIzMmRhYTU3YmE1MTY1MTE0YmFiN2MxMGYwYyIsInN1YiI6IjY0M2E2YWZlZTMyOTQzMDU4MGY5YWM3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nNAQQ5lKeE9ASJczWAdkvH0HoK-ZH2nxZHoxefLEeK4",
  };

  const configGetToken: TConfigurationRequest<THeaderRequest> = {
    method: "GET",
    url: "https://api.themoviedb.org/3/authentication/token/new",
    headers: headerRequest,
  };

  const loginWithAuthenticate = async (username: string, password: string) => {
    type ResponseTokens = AxiosResponse<{ request_token: string; expires_at: string }>;

    setIsRequestDone(true);
    try {
      const requestToken: ResponseTokens = await axios.request(configGetToken);

      const configGetApprovedToken: TAuthLogin<THeaderRequest> = {
        method: "POST",
        url: "https://api.themoviedb.org/3/authentication/token/validate_with_login",
        headers: headerRequest,
        data: {
          username: username,
          password: password,
          request_token: requestToken.data.request_token,
        },
      };
      const getApprovedToken: ResponseTokens = await axios.request(configGetApprovedToken);

      const configAuthGetSession: TAuthLogin<THeaderRequest> = {
        method: "POST",
        url: "https://api.themoviedb.org/3/authentication/session/new",
        headers: headerRequest,
        data: {
          username: username,
          password: password,
          request_token: getApprovedToken.data.request_token,
        },
      };

      const authenticateUser: AxiosResponse<{ session_id: string }> = await axios.request(
        configAuthGetSession
      );

      const sessionTokens = authenticateUser.data.session_id;

      setSession(sessionTokens);

      const { data }: { data: User } = await axios.get(
        `https://api.themoviedb.org/3/account?api_key=${
          import.meta.env.VITE_API_KEY
        }&session_id=${sessionTokens}`
      );

      setCurrentUser(data);
      setIsRequestDone(false);

      navigate("/");
    } catch (error) {
      if (error instanceof AxiosError) setErrorMessage(error?.response?.data);

      setIsRequestDone(false);
    }
  };

  const getCurrentUser = useCallback(
    function () {
      return currentUser ? currentUser : null;
    },
    [currentUser]
  );

  const getErrorMessage = useCallback(() => {
    return error ? error : null;
  }, [error]);

  const logoutCurrentUser = () => {
    logOut(null);
    sessionStorage.removeItem("session");
    enqueueSnackbar("Completely Logged Out", { variant: "info" });
  };

  return {
    loginWithAuthenticate,
    logoutCurrentUser,
    getCurrentUser,
    getErrorMessage,
    isRequestDone,
  };
};

export { useAuthenticateRequest };
