import type { NextPage } from "next";

import Navbar from "@/components/Navbar";

import BottomNav from "@/components/Navs/BottomNav";
import NavbarDetails from "@/components/NavbarDetails";

import { Publication } from "@/utils/lens/generatedLenster";


const Upload: NextPage = () => {
  return (
    <div>
      <div className="xl:w-[1200px] lg:w-[1100px] m-auto overflow-hidden border-0 ">
        <Navbar />
      </div>
      <div>
       
      </div>
      <div className="xl:w-[1200px] lg:w-[1100px] m-auto overflow-hidden border-0 ">
        <BottomNav />
      </div>
    </div>
  );
};

export default Upload;
