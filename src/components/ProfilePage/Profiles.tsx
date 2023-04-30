import type { NextPage } from "next";

import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar/Sidebar";
import ProfileCard from "@/components/ProfilePage/ProfileCard";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { Profile, ProfileDocument } from "@/utils/lens";
import { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";
import { useAppStore } from "@/store/app";
import BottomNav from "../Navs/BottomNav";
import NavbarDetails from "../NavbarDetails";



const Profile: NextPage = () => {
  const router = useRouter();
  const { id } = router.query
  const [following, setFollowing] = useState(false)  
  const currentProfile = useAppStore((state) => state.currentProfile);

  const { data, loading, error } = useQuery
    (ProfileDocument, {
      variables: { 
        request: {
          profileId: id,
        }
      },
    });
    
    const profile = data?.profile
    console.log("Profile", profile);

    useEffect(() => {
      if(profile?.isFollowedByMe === true) {
      setFollowing(true) 
    } else {
      setFollowing(false)
    }
      if (!currentProfile) {
        setFollowing(false)
      }
      }, [profile?.isFollowedByMe])

  return (
    <div>
      <div className="xl:w-[1200px] lg:w-[1100px] m-auto overflow-hidden h-[100vh]">
        <Toaster position="bottom-right" />
        <NavbarDetails />
        <div className="flex gap-6">
          <div className="h-[92vh] overflow-hidden hidden lg:block lg:hover:overflow-auto">
            <Sidebar />
          </div>
          <div className="mt-4 flex flex-col gap-10 overflow-auto h-[88vh] videos flex-1">
            <ProfileCard profile={profile as Profile} setFollowing={setFollowing} following={following} />
          </div>
        </div>
        <div className="block md:hidden">
          <BottomNav/>
        </div>
      </div>
    </div>
  );
};

export default Profile;