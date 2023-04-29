import type { NextPage } from "next";

import Navbar from "@/components/Navbar";
import UploadVideo from "@/components/VideoUpload";
import BottomNav from "@/components/Navs/BottomNav";

const Upload: NextPage = () => {
  return (
    <div>
      <div>
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
