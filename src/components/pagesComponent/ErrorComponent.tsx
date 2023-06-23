import { DataArray } from "@mui/icons-material";

const ErrorComponent = () => {
  return (
    <div className='w-full text-5xl text-secondary  h-screen flex flex-col justify-center items-center gap-10'>
      <div className='text-9xl'>
        <DataArray fontSize='inherit' />
      </div>
      404 Page Not Found
    </div>
  );
};

export default ErrorComponent;
