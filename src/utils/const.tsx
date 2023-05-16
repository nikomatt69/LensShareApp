import { BsCode, BsEmojiKissFill, BsEmojiSunglasses } from "react-icons/bs";
import { GiCakeSlice, GiGalaxy, GiLipstick } from "react-icons/gi";
import { FaPaw, FaMedal, FaGamepad } from "react-icons/fa";
import { BellAlertIcon } from "@heroicons/react/24/solid";
import { IoMdAlert } from "react-icons/io";

export const topics = [
  {
    name: "Sensitive-NSFW",
    icon: <BellAlertIcon />,
  },
  {
    name: "Sensitive-OFFENSIVE",
    icon: <IoMdAlert />,
  },
  {
    name: "Coding",
    icon: <BsCode />,
  },
  {
    name: "Funny",
    icon: <BsEmojiSunglasses />,
  },
  {
    name: "Gaming",
    icon: <FaGamepad />,
  },
  {
    name: "Food",
    icon: <GiCakeSlice />,
  },
  {
    name: "Dance",
    icon: <GiGalaxy />,
  },
  {
    name: "Beauty",
    icon: <GiLipstick />,
  },
  {
    name: "Animals",
    icon: <FaPaw />,
  },
  {
    name: "Sports",
    icon: <FaMedal />,
  },
];

export const footerList1 = [
  "About",
  "Newsroom",
  "Store",
  "Contact",
  "Carrers",
  "ByteDance",
  "Creator Directory",
];
export const footerList2 = [
  "TikTik for Good",
  "Advertise",
  "Developers",
  "Transparency",
  "TikTik Rewards",
];
export const footerList3 = [
  "Help",
  "Safety",
  "Terms",
  "Privacy",
  "Creator Portal",
  "Community Guidelines",
];
export const IPFS_GATEWAY = "https://gateway.ipfscdn.io/ipfs/";
