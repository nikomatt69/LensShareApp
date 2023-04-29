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
	<Script id="badge-id" strategy="afterInteractive">
        {`const BADGE_ID = '873358a62fe4f2c0';`}
      </Script>
      <Script src="https://static.alchemyapi.io/scripts/badge/alchemy-badge.js" />
      <a href="#">
        <img onClick={() => {
          if (typeof window !== "undefined") {
            // @ts-ignore
            window.logBadgeClick();
          }
        }} id="badge-button" style={{width:240,height:53}} src="https://static.alchemyapi.io/images/marketing/badge.png" alt="Alchemy Supercharged" />
      </a>
    <p className="text-gray-400 text-sm mt-5">© 2022 LensShare</p>
  </div>
);

export default Footer;