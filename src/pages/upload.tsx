import type { NextPage } from "next";

import Navbar from "@/components/Navbar";
import UploadVideo from "@/components/VideoUpload";
import BottomNav from "@/components/Navs/BottomNav";
import NavbarDetails from "@/components/NavbarDetails";
import Toggle from "@/components/VideoUpload/Toggle";
import { Publication } from "@/types/lens";

const Upload: NextPage = (publication) => {
  return (
    <div>
      <div className="xl:w-[1200px] lg:w-[1100px] m-auto overflow-hidden border-0 ">
        <Navbar />
      </div>
      <div>
        <Toggle publication={publication as Publication}/>
      </div>
      <div className="xl:w-[1200px] lg:w-[1100px] m-auto overflow-hidden border-0 ">
        <BottomNav />
      </div>
    </div>
  );
};

export default Upload;
