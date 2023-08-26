import type { FC } from 'react';
import React from 'react';

type Props = {
  icon: React.ReactNode;
  count: number;
  text: string;
};

const StatCard: FC<Props> = ({ icon, count, text }) => {
  return (
    <div className=" flex flex-col items-center justify-center space-y-3 rounded-xl bg-blue-700 p-6">
      <span>{icon}</span>
      <div className="text-center">
        <h6 className="mb-1 text-3xl font-semibold opacity-90">{count}</h6>
        <div className="truncate whitespace-nowrap text-xs font-medium opacity-70">
          {text}
        </div>
      </div>
    </div>
  );
};

export default StatCard;
