import React from 'react';

type Props = {} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

const SpacesButton = ({ children, ...props }: Props) => {
  return (
    <button
      className="rounded-lg bg-blue-700 px-8 py-2 text-sm text-white"
      {...props}
    >
      {children}
    </button>
  );
};

export default SpacesButton;
