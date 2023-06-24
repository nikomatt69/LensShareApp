
import React from 'react'
import Custom404 from 'src/pages/404'

import Curated from './Curated'
import Wrapper from './Wrapper'
import { useAppStore } from '@/store/app'
import getIsFeatureEnabled from '@/utils/functions/getIsFeatureEnabled'
import { FEATURE_FLAGS } from '@/utils/data/feature-flags'
import { Profile, Publication } from '@/types/lens'
import Navbar from '../NavbarDetails'
import BottomNav from '../Navs/BottomNavDetails'




const Echos = (publication:Publication) => {
  


  return (
    <div>
    <Navbar />
    <div>
    <Wrapper publication={publication} >
      <Curated />
    </Wrapper>
    </div>
    </div>

    
  )
}

export default Echos
