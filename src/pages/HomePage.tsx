import HomeComponent from "../components/pagesComponent/HomeComponent";
import Logout from "@/components/common/utils/Logout";

const HomePage = ({ location }: { location: string }) => {
  return (
    <>
      {location === "/logout" ? <Logout /> : null}
      <HomeComponent />
    </>
  );
};

export default HomePage;
