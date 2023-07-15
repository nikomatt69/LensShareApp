import { LENSTOK_URL } from "@/constants";
import useSendMessage from "@/utils/hooks/useSendMessage";
import { Profile } from "@/utils/lens/generatedLenster";
import { VideoCameraIcon } from "@heroicons/react/24/outline";
import { ContentTypeText } from "@xmtp/xmtp-js";
import Link from "next/link";
import { FC } from "react";


const apiCall = await fetch(
    '/api/create-room',
    {
        method: 'POST',
        body: JSON.stringify({
            title: 'LensShare Meet'
        }),
        headers: {
            'Content-Type': 'application/json',
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
        }
    }
);

const MeetingIcon: FC = () => {
   
  

  

 return <Link
        href={`${LENSTOK_URL}/meet/`}

        onClick={async () => {
            const apiCall = await fetch(
                '/api/create-room',
                {
                    method: 'POST',
                    body: JSON.stringify({
                        title: 'LensShare Meet'
                    }),
                    headers: {
                        'Content-Type': 'application/json',
                        'x-api-key': process.env.NEXT_PUBLIC_API_KEY || '',
                    }
                }
            );
            const data = await apiCall.json();
            const roomId = data.data;

            useSendMessage(
                `Join here for a call: ${LENSTOK_URL}/meet/${roomId}`



            );

        } }
        className=" mb-2 mr-4 inline h-8  w-8 cursor-pointer"
        draggable="false"

    >
        <VideoCameraIcon />
    </Link>;
};


export default MeetingIcon

