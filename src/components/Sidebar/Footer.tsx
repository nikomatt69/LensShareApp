import { Link } from 'interweave-autolink';
import Script from 'next/script';
import React, { useState } from 'react';
const List = ({ items, mt }: { items: string[]; mt: Boolean }) => (
  <div className={`flex flex-wrap gap-2 ${mt && 'mt-5'}`}>
    {items.map((item: string) => (
      <p
        key={item}
        className="cursor-pointer text-sm  text-gray-400 hover:underline"
      >
        {item}
      </p>
    ))}
  </div>
);

const Footer = () => (
  <div className="mt-6 hidden xl:block">
    <p className="mt-5 text-sm text-gray-400">© 2022 LensShare</p>
    <Link href="/terms">
      <p className="mt-1 cursor-pointer text-sm text-black hover:underline">
        Terms of Service
      </p>
    </Link>
    <Link href="/privacy">
      <p className="mt-1 cursor-pointer text-sm text-black hover:underline">
        Privacy Policy
      </p>
    </Link>
  </div>
);

export default Footer;
