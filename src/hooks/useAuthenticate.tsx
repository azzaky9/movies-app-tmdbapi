// import { useContext } from "react";
// import { AuthContext } from "@/context/AuthContext";
import axios, { AxiosResponse } from "axios";

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
  // const { setCurrentUser } = useContext(AuthContext);

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

      const configGetInformation: TConfigurationRequest<THeaderRequest> = {
        method: "GET",
        url: `https://api.themoviedb.org/3/account?${authenticateUser.data.session_id}`,
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2ZWMwNDIzMmRhYTU3YmE1MTY1MTE0YmFiN2MxMGYwYyIsInN1YiI6IjY0M2E2YWZlZTMyOTQzMDU4MGY5YWM3MCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.nNAQQ5lKeE9ASJczWAdkvH0HoK-ZH2nxZHoxefLEeK4",
        },
      };

      const getInformationUser = await axios.request(configGetInformation);
      console.log(getInformationUser.data);
    } catch (e) {
      console.log(e);
    }
  };

  return { loginWithAuthenticate };
};

export { useAuthenticateRequest };
