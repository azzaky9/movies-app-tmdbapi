import { useAuthenticateRequest } from "@/hooks/useAuthenticate";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { memo } from "react";

const RoundedProfile = memo(() => {
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
      height={45}
      width={45}
    />
  );
});

export default RoundedProfile;
