import MetaTags from '@/components/UI/MetaTags'
import Subscriptions from '@/components/Subscriptions/Feed'

import type { NextPage } from 'next'
import React from 'react'
import Navbar from '../Navbar'
import BottomNav from '../Navs/BottomNav'
import { Card } from '../UI/Card'
import { APP_NAME } from '@/constants'
import Sidebar from '../Sidebar/Sidebar'
import NavbarDetails from '../NavbarDetails'

const Feed: NextPage = () => {
  return (
    <>
      <MetaTags title={`Feed • ${APP_NAME} `} />
      <NavbarDetails/>
      <Card className="rounded-xl xl:w-[1200px] lg:w-[1100px] px-3">
      <Subscriptions />
      </Card> 
      <BottomNav/>
    </>
  )
}

export default Feed
