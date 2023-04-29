import React, { useEffect, useState } from 'react'
import LiveContent from './LiveContent'
import Player from './LiveContent'
import { Toaster } from 'react-hot-toast'
import Navbar from '../Navbar'
import Sidebar from '../Sidebar/Sidebar'
import BottomNav from '../Navs/BottomNav'
import Toggle from './Toggle'


const Live = () => {

  return (
    <div>
      <div className="xl:w-[1200px] lg:w-[1100px] m-auto overflow-hidden h-[100vh]">
        <Toaster position="bottom-right" />
        <Navbar />
        <div className="flex gap-6">
          <div className="h-[92vh] overflow-hidden hidden lg:block lg:hover:overflow-auto">
            <Sidebar />
          </div>
          <div className="mt-4 flex flex-col items-center  overflow-auto   flex-1">
            <Toggle/>
          </div>
        </div>
        <div className="block md:hidden">
          <BottomNav/>
        </div>
      </div>
    </div>
  )
}

export default Live