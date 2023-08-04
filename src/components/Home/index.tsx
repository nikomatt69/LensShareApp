import { NextPage } from "next";
import NewPost from "../Composer/Post/New";
import Explore from "../HomePage/Explore";
import Footer from "../Sidebar/Footer";
import Timeline from "../Timeline";
import { GridItemEight, GridItemFour, GridLayout } from "../UI/GridLayout";
import MetaTags from "../UI/MetaTags";
import { useAppStore } from "@/store/app";
import BytesSection from "./BytesSection";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar/Sidebar";


const Home: NextPage = () => {
  const currentProfile = useAppStore((state) => state.currentProfile);




  return (
    <>
      <MetaTags />
      <Navbar/>
      <GridLayout>
      <GridItemFour>
         <Sidebar/>
          <Footer />
        </GridItemFour>
        <GridItemEight className="space-y-5">
          
          <BytesSection/>
          {currentProfile?.id ? 
            
              <><NewPost /><Timeline /></>
              :<Explore/>
            }
        </GridItemEight>
      </GridLayout>
    </>
  );
};

export default Home;
