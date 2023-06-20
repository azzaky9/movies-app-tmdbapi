import { useAuthenticateRequest } from "@/hooks/useAuthenticate";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";

interface TPropInputForm extends React.HTMLProps<HTMLInputElement> {
  withHelperText?: boolean;
  withTogglePassword?: boolean;
  type: "password" | "text";
}

const InputForm: React.FC<TPropInputForm> = ({
  withHelperText,
  withTogglePassword,
  type,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const { getErrorMessage } = useAuthenticateRequest();
  const { value } = props;
  const { setErrorMessage } = useContext(AuthContext);

  const error = getErrorMessage();

  const renderErrorText = (
    <p className='text-red-700 text-[0.750rem] p-3'>{error?.status_message}</p>
  );

  const checkValueInputNotZero = () => {
    if (typeof value === "string") {
      if (value.length > 0) {
        setErrorMessage(null);
      }
    }
  };

  useEffect(() => {
    checkValueInputNotZero();
  }, [value]);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const renderPaswordIndicator = withTogglePassword ? (
    <IconButton
      onClick={handleClickShowPassword}
      sx={{ position: "absolute", right: 5, p: 1.8 }}>
      {showPassword ? <Visibility htmlColor='#ababab' /> : <VisibilityOff htmlColor='#ababab' />}
    </IconButton>
  ) : null;

  return (
    <div className='relative'>
      <input
        className={`w-full bg-transparent outline-none rounded-md py-4 px-4 border 
        ${error?.status_message ? "border-red-700" : "border-accent"} 
        border-opacity-50 text-white text-sm hover:border-opacity-70 
        focus:border-opacity-80 
        placeholder:text-zinc-600 
        placeholder:text-sm
        `}
        type={withTogglePassword && showPassword ? "text" : type}
        {...props}
      />
      {renderPaswordIndicator}
      {error?.status_message && withHelperText ? renderErrorText : null}
    </div>
  );
};

export default InputForm;
