import { Link } from "interweave-autolink";
import Script from "next/script";
import React, { useState }  from 'react';
const List = ({ items, mt }: { items: string[]; mt: Boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && "mt-5"}`}>
    {items.map((item: string) => (
      <p
        key={item}
        className="text-gray-400 text-sm  hover:underline cursor-pointer"
      >
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => (
  <div className="mt-6 hidden xl:block">
    <p className="text-gray-400 text-sm mt-5">© 2022 LensShare</p>
    <Link href="/terms">
      <p className="text-black text-sm mt-1 hover:underline cursor-pointer">
        Terms of Service
      </p>
    </Link>
    <Link href="/privacy">
      <p className="text-black text-sm mt-1 hover:underline cursor-pointer">
        Privacy Policy
      </p>
    </Link>
  </div>
);

export default Footer;