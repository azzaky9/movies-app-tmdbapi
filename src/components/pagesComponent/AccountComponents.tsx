import { RoundedProfile } from "../common/utils";
import { useAuthenticateRequest } from "@/hooks/useAuthenticate";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Person } from "@mui/icons-material";

const AccountComponents = () => {
  const { getCurrentUser } = useAuthenticateRequest();
  const user = getCurrentUser();
  const userProfile = user?.avatar?.tmdb?.avatar_path;
  const navigate = useNavigate();

  const informationWithoutProfile = !userProfile ? <InformationWithourProfile /> : null;

  const renderInformation = !user ? (
    <Button
      onClick={() => navigate("/sign-in")}
      variant='contained'
      size='large'
      color='neutral'>
      Login
    </Button>
  ) : null;

  return (
    <div className='px-20 py-7 '>
      <div className='flex  gap-12 items-center p-10  border-secondary border-2 border-opacity-20 rounded-2xl bg-gray-400 bg-opacity-5 backdrop-blur-xl'>
        <div className='border-2 border-white border-opacity-0 hover:border-opacity-100 hover:cursor-pointer rounded-full'>
          {userProfile ? <RoundedProfile size={160} /> : <Person sx={{ fontSize: "5rem" }} />}
        </div>
        <div>
          <h3 className='text-2xl mb-4 font-semibold'>Name: {user?.name ? user?.name : "?"}</h3>
          <h3 className='text-secondary'>Username: {user?.username ? user?.username : "?"}</h3>
        </div>
      </div>
      {informationWithoutProfile}
      {renderInformation}
    </div>
  );
};

const InformationWithourProfile = () => {
  const messages = [
    "It's look like you not set Profile Picture on TMDB Website",
    "This website use third party for the service, I'm Sorry you can't set profile and name inhere",
    "But you can set everyting on",
  ];

  return (
    <ul className='p-10 list-disc text-sm text-secondary'>
      {messages.map((message, index) => (
        <li key={index}>
          {message}{" "}
          {index === 2 ? (
            <a
              className='text-blue-800'
              href={`https://www.themoviedb.org/settings/account`}>
              here
            </a>
          ) : null}
        </li>
      ))}
    </ul>
  );
};

export default AccountComponents;
