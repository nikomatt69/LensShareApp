import Link from "next/link";
import React from "react";

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  to?: string;
  onClick?: () => void;
  text?: string;
}

export default function Button({
  children,
  className,
  to,
  text,
  onClick,
}: ButtonProps) {
  return (
    <div
      onClick={to ? undefined : onClick}
      className={
        "inline-flex items-center border justify-center  font-regular leading-5  transition-all duration-200  rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 hover:cursor-pointer " +
        className +
        " " +
        text
      }
    >
      <>
        {to ? (
          <Link href={to} passHref>
            {children}
          </Link>
        ) : (
          children
        )}
      </>
    </div>
  );
}
