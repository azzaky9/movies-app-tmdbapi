import { ArrowDropDownOutlined } from "@mui/icons-material";

const UserProfile = () => {
  return (
    <div className='flex justify-center items-center gap-2'>
      <Profile />
      <ArrowDropDownOutlined />
    </div>
  );
};

const Profile = () => {
  return (
    <div className='w-[46px] h-[46px] rounded-full bg-profile-undefined bg-center bg-no-repeat bg-cover'></div>
  );
};

export default UserProfile;
