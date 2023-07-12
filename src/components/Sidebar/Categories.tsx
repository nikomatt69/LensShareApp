import React from 'react';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { topics } from '../../utils/const';

const Categories = () => {
  const router = useRouter();
  const { topic } = router.query;

  const activeTopicStyle =
    'lg:border-2 bg-[#57B8FF] lg:border-[#a3f32b] px-3 py-2 rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#000000]';
  const topicStyle =
    'lg:border-2 hover:text-[#000000] hover:bg-[#57B8FF] lg:border-gray-300 px-3 py-2 rounded lg:rounded-full flex items-center gap-2 justify-center cursor-pointer text-[#000000]';

  return (
    <div className="pb-6 xl:border-b-2 xl:border-gray-200">
      <p className="m-3 mt-4 hidden font-semibold text-gray-500 lg:block">
        Popular Topics
      </p>
      <div className="flex flex-wrap gap-3">
        {topics?.map((item) => (
          <Link href={`/?topic=${item.name}`} key={item.name}>
            <div
              className={topic === item.name ? activeTopicStyle : topicStyle}
            >
              <span className="xl:text-md text-2xl font-bold ">
                {item.icon}
              </span>
              <span className={`text-md font-medium capitalize`}>
                {item.name}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
