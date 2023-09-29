import React, { useMemo } from 'react';

export const CardShimmer = () => {
  return (
    <div className="flex h-full w-full flex-col rounded-sm bg-white p-2 dark:bg-gray-900/70">
      <div className="flex animate-pulse flex-col">
        <div className="w-full rounded-lg bg-gray-300" />
        <div className="mt-2 space-y-2">
          <div className="h-2 rounded-2xl bg-gray-300" />
          <div className="h-3 rounded-2xl bg-gray-300 " />
        </div>
      </div>
    </div>
  );
};

const EchosShimmer = () => {
  const cards = useMemo(() => Array(24).fill(1), []);

  return (
    <div className="desktop:grid-cols-6 ultrawide:grid-cols-7 laptop:grid-cols-4 mx-auto mt-4 grid max-w-[100rem] grid-cols-2 place-items-center gap-2 md:grid-cols-3 md:gap-3">
      {cards.map((i, idx) => (
        <CardShimmer key={`${i}_${idx}`} />
      ))}
    </div>
  );
};

export default EchosShimmer;
