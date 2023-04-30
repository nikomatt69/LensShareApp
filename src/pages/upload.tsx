import type { NextPage } from "next";

import Navbar from "@/components/Navbar";
import UploadVideo from "@/components/VideoUpload";
import BottomNav from "@/components/Navs/BottomNav";
import NavbarDetails from "@/components/NavbarDetails";

const Upload: NextPage = () => {
  return (
    <div>
      <div>
        <NavbarDetails />
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
