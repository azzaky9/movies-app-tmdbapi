import HomeComponent from "../components/HomeComponent";
import Logout from "@/components/Logout";

const HomePage = ({ location }: { location: string }) => {
  return (
    <>
      {location === "/logout" ? <Logout /> : null}
      <HomeComponent />
    </>
  );
};

export default HomePage;
