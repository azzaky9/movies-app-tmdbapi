import { SearchOutlined } from "@mui/icons-material";
import { useState } from "react";

const SearchInput = () => {
  const [input, setInput] = useState<string>("");

  const inputHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.currentTarget.value);
  };

  return (
    <div className='flex w-full rounded-xl bg-input-only'>
      <span className={`py-[14px] pl-[14px] ${input.length > 0 ? "text-white" : "text-secondary"}`}>
        <SearchOutlined />
      </span>
      <input
        type='text'
        placeholder='Search Any Type'
        value={input}
        onChange={inputHandle}
        className='w-full bg-input-only placeholder:text-secondary p-[14px] '
      />
    </div>
  );
};

export default SearchInput;
