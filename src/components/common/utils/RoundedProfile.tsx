import { useAuthenticateRequest } from "@/hooks/useAuthenticate";
import AccountCircle from "@mui/icons-material/AccountCircle";

interface ProfilePropTypes {
  size?: number;
}

const RoundedProfile: React.FC<ProfilePropTypes> = ({ size }) => {
  const { getCurrentUser } = useAuthenticateRequest();
  const user = getCurrentUser();
  const userProfile = user?.avatar?.tmdb?.avatar_path;

  if (!userProfile) {
    return <AccountCircle />;
  }
  return (
    <img
      src={`https://image.tmdb.org/t/p/original${userProfile}`}
      alt='profile-users'
      className='rounded-full'
      height={size ? size : 45}
      width={size ? size : 45}
    />
  );
};

export default RoundedProfile;
