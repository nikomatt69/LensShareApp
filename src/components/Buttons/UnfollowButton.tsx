import { FollowNFT } from '@/abi/FollowNFT'
import onError from '@/lib/onError'
import splitSignature from '@/lib/splitSignature'
import { useAppStore } from '@/store/app'
import { CreateBurnEip712TypedData, Profile } from '@/utils/lens/generatedLenster'
import useBroadcast from '@/utils/useBroadcast'
import { Contract, Signer } from 'ethers'
import React, { Dispatch, FC, useState } from 'react'
import { useSignTypedData, WalletClient } from 'wagmi'
import getSignature from '@/lib/getSignature'
import { toast } from 'react-hot-toast'
import { useCreateUnfollowTypedDataMutation } from '@/types/graph'

import { W } from 'mongodb'
import useEthersWalletClient from '@/utils/hooks/useEthersWalletClient'

interface Props {
  setFollowing: Dispatch<boolean>
  profile: Profile
}

const UnfollowButton: FC<Props> = ({ setFollowing, profile }) => {
  const currentProfile = useAppStore((state) => state.currentProfile)
  const [writeLoading, setWriteLoading] = useState(false)
  const { isLoading: signLoading, signTypedDataAsync } = useSignTypedData({ onError })
  const { data: signer } = useEthersWalletClient()

  const burnWithSig = async (signature: string, typedData: CreateBurnEip712TypedData) => {
    const { tokenId, deadline } = typedData.value
    const { v, r, s } = splitSignature(signature)
    const sig = { v, r, s, deadline }

    const followNftContract = new Contract(typedData.domain.verifyingContract, FollowNFT, signer as Signer  )

    const tx = await followNftContract.burnWithSig(tokenId, sig)
  }

  const { broadcast } = useBroadcast({
    onCompleted: () => {
      setFollowing(false)
    }
  })

  const [createUnfollowTypedData, { loading: typedDataLoading }] = useCreateUnfollowTypedDataMutation({
    onCompleted: async ({ createUnfollowTypedData }) => {
      try {
        const { typedData, id } = createUnfollowTypedData
        const signature = await signTypedDataAsync(getSignature(typedData))

        setWriteLoading(true)
        try {
          const { data } = await broadcast({ request: { id, signature } })
          if (data?.broadcast?.reason) {
            await burnWithSig(signature, typedData)
          }
          toast.success('Unfollowed succesfully')
        } catch {
          toast.error('User rejected request')
        } finally {
          setWriteLoading(false)
        }
      } catch {}
    },
    onError
  })

  const createUnfollow = () => {
    if (!currentProfile) {
      return toast.error("Please connect your wallet")
    }

    createUnfollowTypedData({
      variables: {
        request: { profile: profile?.id }
      }
    })
  }

  return (
    <div>
      <button onClick={createUnfollow} 
        className='active:bg-violet-600 py-1 px-1 drop-shadow-xl rounded-full border-2 border-black text-xs mt-2  hover:text-white hover:bg-[#57B8FF] transition cursor-pointer bg-blue-500 text-[#000000] font-semibold'>
        Unfollow
      </button>
    </div>
  )
}

export default UnfollowButton