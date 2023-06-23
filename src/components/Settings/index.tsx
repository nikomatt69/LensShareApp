
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Custom404 from 'src/pages/404'


import BasicInfo from './BasicInfo'
import ProfileInterests from './ProfileInterests'
import SideNav from './SideNav'
import { useAppStore } from '@/store/app'
import { useProfileQuery } from '@/utils/lens/generated'
import { MediaSet, Profile } from '@/types/lens'
import MetaTags from '../UI/MetaTags'
import SettingsShimmer from './SettingsShimmer'
import NavbarDetails from '../NavbarDetails'
import BottomNav from '../Navs/BottomNav'

const Permissions = dynamic(() => import('./Permissions'))
const Membership = dynamic(() => import('./Membership'))
const DangerZone = dynamic(() => import('./DangerZone'))

export const SETTINGS_MEMBERSHIP = '/settings/membership'
export const SETTINGS_INTERESTS = '/settings/interests'
export const SETTINGS_PERMISSIONS = '/settings/permissions'
export const SETTINGS_DANGER_ZONE = '/settings/danger'
export const SETTINGS = '/settings'

const Settings = () => {
  const router = useRouter()
  const currentProfile = useAppStore((state) => state.currentProfile);

  

  const { data, loading, error } = useProfileQuery({
    variables: {
      request: { profileId: currentProfile?.id}
    },
    skip: !currentProfile?.id,
  })

  if (error) {
    return <Custom404 />
  }
  if (loading || !data) {
    return <SettingsShimmer />
  }

  if (!data?.profile || (!currentProfile && router.isReady)) {
    return <Custom404 />
  }

  const profile = data?.profile as Profile & {
    coverPicture: MediaSet
  }

  return (
    <div className="container mx-auto max-w-full">
      <MetaTags title="Channel Settings" />
      {profile ? (
        <div className="grid gap-4 md:grid-cols-4">
          <NavbarDetails/>

          <div className="md:col-span-1">
            <SideNav channel={profile} />
          </div>
          <div className="md:col-span-3">
            {router.pathname === SETTINGS && <BasicInfo channel={profile} />}
            {router.pathname === SETTINGS_MEMBERSHIP && (
              <Membership channel={profile} />
            )}
            {router.pathname === SETTINGS_PERMISSIONS && <Permissions />}
            {router.pathname === SETTINGS_INTERESTS && <ProfileInterests />}
            {router.pathname === SETTINGS_DANGER_ZONE && <DangerZone />}
          </div>

        </div>
      ) : null}
      <BottomNav/>
    </div>
  )
}

export default Settings
