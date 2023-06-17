import React, { useState } from "react";
import { Box, InputAdornment, IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import OutlinedInput, { OutlinedInputProps } from "@mui/material/OutlinedInput";
import { TAutenticateData } from "@/components/LoginComponent";

type TInputGroupsProps = {
  value: TAutenticateData;
  setValue: React.Dispatch<React.SetStateAction<TAutenticateData>>;
};

const OutlineInputCustom = styled(OutlinedInput)<OutlinedInputProps>(({ theme }) => ({
  width: "100%",
  color: theme.palette.neutral.main,

  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(249, 181, 70, 0.528)",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(249, 181, 70, 0.327)",
    color: "white",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "rgba(249, 181, 70, 0.888)",
  },
}));

const InputGroups: React.FC<TInputGroupsProps> = ({ value, setValue }) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleformData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <>
      <Box
        sx={{
          width: 500,
          maxWidth: "100%",
        }}>
        <OutlineInputCustom
          color='primary'
          name='username'
          value={value.username}
          onChange={handleformData}
          autoComplete='off'
          type='text'
          placeholder='Username'
        />
      </Box>
      <OutlineInputCustom
        fullWidth
        name='password'
        value={value.password}
        onChange={handleformData}
        id='outlined-adornment-password'
        type={showPassword ? "text" : "password"}
        sx={{
          "& .MuiOutlinedInput-adornedEnd": {
            outlineColor: "red",
          },
        }}
        endAdornment={
          <InputAdornment position='start'>
            <IconButton
              aria-label='toggle password visibility'
              onClick={handleClickShowPassword}
              edge='end'>
              {showPassword ? (
                <VisibilityOff htmlColor='#ababab' />
              ) : (
                <Visibility htmlColor='#ababab' />
              )}
            </IconButton>
          </InputAdornment>
        }
        placeholder='Password'
      />
    </>
  );
};

export default InputGroups;
