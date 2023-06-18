import { useCallback, useContext } from "react";
import { AuthContext, User } from "@/context/AuthContext";
import axios, { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";

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
  const { setCurrentUser, value } = useContext(AuthContext);
  const { currentUser } = value;
  const navigate = useNavigate();

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

  const loginWithAuthenticate = useCallback(
    async (username: string, password: string) => {
      type ResponseTokens = AxiosResponse<{ request_token: string }>;

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
        // const { data } = await axios.request(configGetApprovedToken);
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

        const { data }: { data: User } = await axios.get(
          `https://api.themoviedb.org/3/account?api_key=${
            import.meta.env.VITE_API_KEY
          }&session_id=${authenticateUser.data.session_id}`
        );
        setCurrentUser(data);
        navigate("/");
      } catch (e) {
        console.log(e);
      }
    },
    [value]
  );

  const getCurrentUser = () => (currentUser ? currentUser : null);

  const logoutCurrentUser = () => setCurrentUser(null);

  return { loginWithAuthenticate, logoutCurrentUser, getCurrentUser };
};

export { useAuthenticateRequest };
