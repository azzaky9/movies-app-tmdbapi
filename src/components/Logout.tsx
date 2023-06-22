import { useAuthenticateRequest } from "@/hooks/useAuthenticate";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Logout = () => {
  // const { logOut } = useContext(AuthContext)
  const { logoutCurrentUser } = useAuthenticateRequest();
  const location = useLocation();
  const navigate = useNavigate();

  const handleDisagreeResponse = () => navigate("/");

  const handleAgreeReponse = () => {
    logoutCurrentUser();
    navigate("/");
  };

  return (
    <div>
      <Dialog
        open={location.pathname === "/logout" ? true : false}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'>
        <DialogTitle
          id='alert-dialog-title'
          textAlign='center'>
          Are you sure for log out?
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id='alert-dialog-description'
            textAlign='center'>
            Note that if you agree to log out, you will not be able to use the services on this
            website
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDisagreeResponse}>Disagree</Button>
          <Button
            onClick={handleAgreeReponse}
            autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Logout;
