import type { NextPage } from "next";

import Navbar from "@/components/Navbar";
import UploadVideo from "@/components/VideoUpload";
import BottomNav from "@/components/Navs/BottomNav";
import NavbarDetails from "@/components/NavbarDetails";

const Upload: NextPage = () => {
  return (
    <div>
      <div className="xl:w-[1200px] lg:w-[1100px] m-auto overflow-hidden h-[100vh]">
        <Navbar />
      </div>
      <div>
        <UploadVideo />
      </div>
      <div>
        <BottomNav />
      </div>
    </div>
  );
};

export default Upload;
