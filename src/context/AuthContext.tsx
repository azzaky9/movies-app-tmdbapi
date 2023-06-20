import { createContext, useReducer, useEffect } from "react";

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
  | { type: "SET_APPROVED_TOKEN"; payload: string | null }
  | { type: "SET_SESSION_ID"; payload: string | null }
  | { type: "SET_USER_INFO"; payload: User | null }
  | { type: "LOGIN_ERROR"; payload: InvalidStatus | null }
  | { type: "LOGOUT"; payload: null };

type SetPayload<T extends ActionType["type"]> = Extract<ActionType, { type: T }>["payload"];

export interface InvalidStatus {
  status_code: number;
  status_message: string;
  success: boolean;
}

type TReducerState = {
  currentUser: User | null;
  error: InvalidStatus | null;
  requestToken: string | null;
  sessionId: string | null;
};

interface TAuthContext {
  value: TReducerState;
  setApprovedToken: (payload: SetPayload<"SET_APPROVED_TOKEN">) => void;
  setSessionId: (payload: SetPayload<"SET_SESSION_ID">) => void;
  setCurrentUser: (payload: SetPayload<"SET_USER_INFO">) => void;
  setErrorMessage: (payload: SetPayload<"LOGIN_ERROR">) => void;
}

const initialState: TReducerState = {
  currentUser: null,
  error: null,
  requestToken: "",
  sessionId: "",
};

const reducer = (state: TReducerState, action: ActionType): TReducerState => {
  switch (action.type) {
    case "SET_APPROVED_TOKEN":
      return { ...state, requestToken: action.payload };
    case "SET_SESSION_ID":
      return { ...state, sessionId: action.payload };
    case "SET_USER_INFO":
      return { ...state, currentUser: action.payload };
    case "LOGIN_ERROR":
      return { ...state, error: action.payload };
    case "LOGOUT":
      return {
        ...state,
        currentUser: action.payload,
        error: action.payload,
        requestToken: action.payload,
        sessionId: action.payload,
      };
    default:
      return { ...state };
  }
};

export const AuthContext = createContext<TAuthContext>({} as TAuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setApprovedToken = (payload: SetPayload<"SET_APPROVED_TOKEN">) => {
    dispatch({ type: "SET_APPROVED_TOKEN", payload: payload });
  };

  const setSessionId = (payload: SetPayload<"SET_SESSION_ID">) => {
    dispatch({ type: "SET_SESSION_ID", payload: payload });
  };

  const setCurrentUser = (payload: SetPayload<"SET_USER_INFO">) => {
    dispatch({ type: "SET_USER_INFO", payload: payload });
  };

  const setErrorMessage = (payload: SetPayload<"LOGIN_ERROR">) => {
    dispatch({ type: "LOGIN_ERROR", payload: payload });
  };

  const user = localStorage.getItem("currentUser");

  useEffect(() => {
    if (user) setCurrentUser(JSON.parse(user));
  }, []);

  useEffect(() => {
    if (!state.currentUser) localStorage.setItem("currentUser", JSON.stringify(null));

    localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
  }, [state.currentUser]);

  return (
    <AuthContext.Provider
      value={{
        value: state,
        setApprovedToken: setApprovedToken,
        setCurrentUser: setCurrentUser,
        setSessionId: setSessionId,
        setErrorMessage: setErrorMessage,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
