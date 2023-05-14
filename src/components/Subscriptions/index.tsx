import MetaTags from '@/components/UI/MetaTags'
import Subscriptions from '@/components/Subscriptions/Feed'

import type { NextPage } from 'next'
import React from 'react'
import Navbar from '../Navbar'
import BottomNav from '../Navs/BottomNav'
import { Card } from '../UI/Card'
import { APP_NAME } from '@/constants'

const Feed: NextPage = () => {
  return (
    <>
      <MetaTags title={`Feed • ${APP_NAME} `} />
      <Navbar/>
      <Card className="rounded-xl px-3">
      <Subscriptions />
      </Card> 
      <BottomNav/>
    </>
  )
}

export default Feed
