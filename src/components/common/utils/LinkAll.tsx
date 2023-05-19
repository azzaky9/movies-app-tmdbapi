import { EastOutlined } from "@mui/icons-material";
import { Link } from "react-router-dom";

const LinkAll = ({ destination }: { destination: string }) => {
  return (
    <Link
      className='text-accent flex gap-3 items-center'
      to={destination}>
      See All <EastOutlined sx={{ fontSize: "1.3rem" }} />
    </Link>
  );
};

export default LinkAll;
