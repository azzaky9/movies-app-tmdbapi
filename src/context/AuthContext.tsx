import { createContext, useReducer, useEffect } from "react";
import axios from "axios";

interface Avatar<T> {
  gravatar: {
    hash: T;
  };
  tmdb: {
    avatar_path: T;
  };
}

export interface User {
  avatar: Avatar<string>;
  id: number;
  name: string | undefined;
  include_path: boolean;
  username: string;
}

type ActionType =
  | { type: "SET_USER_INFO"; payload: User | null }
  | { type: "LOGIN_ERROR"; payload: InvalidStatus | null }
  | { type: "SET_SESSION"; payload: string }
  | { type: "LOGOUT"; payload: null };

type SetPayload<T extends ActionType["type"]> = Extract<ActionType, { type: T }>["payload"];

export interface InvalidStatus {
  status_code: number;
  status_message: string;
  success: boolean;
}

type TReducerState = {
  currentUser: User | null;
  sessionId: string | null;
  error: InvalidStatus | null;
};

interface TAuthContext {
  value: TReducerState;
  setCurrentUser: (payload: SetPayload<"SET_USER_INFO">) => void;
  setErrorMessage: (payload: SetPayload<"LOGIN_ERROR">) => void;
  setSession: (payload: SetPayload<"SET_SESSION">) => void;
  logOut: (payload: SetPayload<"LOGOUT">) => void;
}

const initialState: TReducerState = {
  currentUser: null,
  error: null,
  sessionId: "",
};

const reducer = (state: TReducerState, action: ActionType): TReducerState => {
  switch (action.type) {
    case "SET_USER_INFO":
      return { ...state, currentUser: action.payload };
    case "LOGIN_ERROR":
      return { ...state, error: action.payload };
    case "SET_SESSION":
      return { ...state, sessionId: action.payload };
    case "LOGOUT":
      return {
        ...state,
        currentUser: action.payload,
        error: action.payload,
        sessionId: action.payload,
      };
    default:
      return { ...state };
  }
};

export const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setCurrentUser = (payload: SetPayload<"SET_USER_INFO">) => {
    dispatch({ type: "SET_USER_INFO", payload: payload });
  };

  const setErrorMessage = (payload: SetPayload<"LOGIN_ERROR">) => {
    dispatch({ type: "LOGIN_ERROR", payload: payload });
  };

  const setSessionId = (payload: SetPayload<"SET_SESSION">) => {
    dispatch({ type: "SET_SESSION", payload: payload });
  };

  const logOut = (payload: SetPayload<"LOGOUT">) => {
    dispatch({ type: "LOGOUT", payload: payload });
  };

  const getAccountWithSession = async (sessionID: string) => {
    const { data }: { data: User } = await axios.get(
      `https://api.themoviedb.org/3/account?api_key=${
        import.meta.env.VITE_API_KEY
      }&session_id=${sessionID}`
    );

    setCurrentUser(data);
  };

  const getSession = sessionStorage.getItem("session");

  useEffect(() => {
    if (getSession) {
      setSessionId(getSession);
      getAccountWithSession(getSession);
    }
  }, []);

  useEffect(() => {
    // if (!getSession) setCurrentUser(null);

    if (state.sessionId) sessionStorage.setItem("session", state.sessionId);
  }, [state.sessionId]);

  return (
    <AuthContext.Provider
      value={{
        value: state,
        setCurrentUser: setCurrentUser,
        setErrorMessage: setErrorMessage,
        setSession: setSessionId,
        logOut: logOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
