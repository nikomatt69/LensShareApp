import React from 'react';
import { AiOutlineReload } from 'react-icons/ai';

const RefreshButton = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <button onClick={refreshPage} className="mx-auto my-2 flex text-blue-700">
      Refresh <AiOutlineReload className="mx-1 mt-0.5 h-5 w-5 text-blue-700 " />
    </button>
  );
};

export default RefreshButton;
