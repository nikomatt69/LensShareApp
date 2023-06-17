import { API_KEY } from '@/constants'
import { useAppStore } from '@/store/app'
import { Player } from '@livepeer/react'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const LiveContent = () => {
    const [stream, setStream] = useState<any[]>()
    const [name, setName] = useState("")
    const [playbackId, setPlaybackId] = useState("")
    const currentProfile = useAppStore((state) => state.currentProfile);

  const streamName = currentProfile?.id;

  useEffect(() => {
    const headers = {
      "content-type": `application/json`,
      'authorization': `Bearer ${API_KEY}`
    };
    
    axios({
        method: `get`,
        url: `/api/get-ipfs-cid-stream/${stream}`,
        headers: headers,
        params: {
            filters: JSON.stringify([{
                id: 'isActive', 
                value: true
            }])
        }
    }).then(response => {
        setStream(response.data);
    }).catch(error => {
        console.log(error);
    });
  }, [])
  console.log(stream)

  return (
    <div>
      {stream?.length === 0 && (
        <div className="bg-black h-[500px] flex justify-center items-center m-4">
        <p className="text-white font-semibold text-xl">No active livestreams happening right now</p>
      </div>
      )}
        {stream?.map(stream => (
                <>
                  {stream?.playbackId && (
                    <div className='p-5' key={streamName}>
                      <Player 
                        title={streamName}
                        playbackId={stream?.playbackId}
                        autoPlay
                        muted
                      />
                    </div>
                  )}
                </>
        ))}
    </div>
  )
}

export default LiveContent