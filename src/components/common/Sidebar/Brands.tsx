import { Link } from "react-router-dom";

const Brands = ({ urlLogo }: { urlLogo: string }) => {
  return (
    <div className='relative w-[185px] h-[58px]'>
      <Link
        to='/'
        className='absolute -left-6 -top-5'>
        <img
          src={urlLogo}
          alt='bussines_logo'
        />
      </Link>
    </div>
  );
};

export default Brands;
