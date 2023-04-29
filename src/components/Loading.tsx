import type { FC } from "react";
import logo from "@/images/Lenstoklogo.png";
import Image from "next/image";

const Loading: FC = () => {
  return (
    <div className="grid items-center justify-content h-screen place-items-center">
       <Image
            className="w-28 h-28"
            height={112}
            width={112}
            src={logo}
            alt="logo"
            layout="responsive"
          />
    </div>
  );
};

export default Loading;
