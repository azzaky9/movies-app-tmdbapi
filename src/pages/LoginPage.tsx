import LoginComponent from "../components/pagesComponent/LoginComponent";
import { Navigate } from "react-router-dom";
import { useAuthenticateRequest } from "@/hooks/useAuthenticate";

const Login = () => {
  const { getCurrentUser } = useAuthenticateRequest();
  const user = getCurrentUser();
  // const navigate = useNavigate();

  if (user) {
    return <Navigate to='/' />;
  }

  return <LoginComponent />;
};

export default Login;
