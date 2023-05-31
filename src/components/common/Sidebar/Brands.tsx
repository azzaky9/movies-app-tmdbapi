import { Link } from "react-router-dom";
import Logo from "/navbar-logo.svg";

const Brands = ({ size }: { size?: "base" | "large" }) => {
  return (
    <div className='relative w-[185px] h-[58px]'>
      <Link
        to='/'
        className='absolute -left-6 -top-5'>
        <img
          src={Logo}
          alt='bussines_logo'
          height={size === "base" ? "auto" : "243px"}
        />
      </Link>
    </div>
  );
};

export default Brands;
