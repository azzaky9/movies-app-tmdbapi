import React from "react";
import { TAutenticateData } from "@/components/pagesComponent/LoginComponent";
import InputForm from "./InputForm";

type TInputGroupsProps = {
  value: TAutenticateData;
  setValue: React.Dispatch<React.SetStateAction<TAutenticateData>>;
};

const InputGroups: React.FC<TInputGroupsProps> = ({ value, setValue }) => {
  const handleformData = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValue((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className='flex flex-col gap-9'>
      <InputForm
        type='text'
        name='username'
        value={value.username}
        onChange={handleformData}
        placeholder='Username'
      />
      <InputForm
        withTogglePassword
        withHelperText
        value={value.password}
        name='password'
        onChange={handleformData}
        type='password'
        placeholder='Password'
      />
    </div>
  );
};

export default InputGroups;
