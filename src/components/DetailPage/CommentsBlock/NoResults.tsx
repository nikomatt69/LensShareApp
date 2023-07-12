import React from 'react';
import { BiCommentX } from 'react-icons/bi';
import { MdOutlineVideocamOff } from 'react-icons/md';

interface IProps {
  text: string;
}

const NoResults = ({ text }: IProps) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <p className="text-7xl">
        {text === 'No Comments Yet! Be the first...' ? (
          <BiCommentX />
        ) : (
          <MdOutlineVideocamOff />
        )}
      </p>
      <p className="text-1xl text-center">{text}</p>
    </div>
  );
};

export default NoResults;
