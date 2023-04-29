/* eslint-disable @next/next/no-img-element */
import Video from 'src/components/HomePage/Video'
import imageCdn from 'src/utils/functions/imageCdn'
import {sanitizeIpfsUrl} from 'src/utils/sanitizeIpfsUrl'
import React, { FC } from 'react'

interface Props {
    message: any
    type: 'image' | 'video' | 'audio' | 'file'
}

const MessageMedia:FC<Props> = ({message, type}) => {
    return (
        <>
            {type === 'image' &&
                <img
                    onClick={() => window.open(sanitizeIpfsUrl(message.content))}
                    src={sanitizeIpfsUrl(message.content)}
                    alt={message.contentFallback ?? ''}
                    className='w-full rounded-2xl cursor-pointer'
                />
            }
            {type === 'video' &&
                <video
                    onClick={() => window.open(sanitizeIpfsUrl(message.content))}
                    src={sanitizeIpfsUrl(message.content)}
                 />
            }
        </>
    )
}

export default MessageMedia