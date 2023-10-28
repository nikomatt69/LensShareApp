import React from 'react';
import { AiOutlineReload } from 'react-icons/ai';

const RefreshButton = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <button onClick={refreshPage} className='mx-auto my-2 text-blue-700 flex'>
     Refresh <AiOutlineReload className='h-5 w-5 mt-0.5 text-blue-700 mx-1 ' />
    </button>
  );
};

export default RefreshButton;