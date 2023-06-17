import { createContext, useReducer } from "react";

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
  | { type: "LOGIN_ERROR"; payload: string | null }
  | { type: "LOGOUT"; payload: null };

type SetActionPayload<T extends ActionType, P> = T extends { payload: P } ? P : never;

type TReducerState = {
  currentUser: User | null;
  error: string | null;
  requestToken: string | null;
  sessionId: string | null;
};

interface TAuthContext {
  value: TReducerState;
  setApprovedToken: (payload: SetActionPayload<ActionType, "SET_APPROVED_TOKEN">) => void;
  setSessionId: (payload: SetActionPayload<ActionType, "SET_SESSION_ID">) => void;
  setCurrentUser: (payload: SetActionPayload<ActionType, "SET_USER_INFO">) => void;
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

  const setApprovedToken = (payload: SetActionPayload<ActionType, "SET_APPROVED_TOKEN">) => {
    dispatch({ type: "SET_APPROVED_TOKEN", payload: payload });
  };

  const setSessionId = (payload: SetActionPayload<ActionType, "SET_SESSION_ID">) => {
    dispatch({ type: "SET_SESSION_ID", payload: payload });
  };

  const setCurrentUser = (payload: SetActionPayload<ActionType, "SET_USER_INFO">) => {
    dispatch({ type: "SET_USER_INFO", payload: payload });
  };

  return (
    <AuthContext.Provider
      value={{
        value: state,
        setApprovedToken: setApprovedToken,
        setCurrentUser: setCurrentUser,
        setSessionId: setSessionId,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
