
import { Link } from 'interweave-autolink'
import type { Publication } from '@/types/lens'
import type { FC } from 'react'
import React, { useState } from 'react'
import CommentsVideo from '@/components/DetailPage/CommentsBlock/Comments'
import Comments from '@/components/DetailPage/CommentsBlock/Comment'
import BottomOverlay from '../BottomOverlay'
import { usePublicationDetailsLazyQuery } from '@/utils/lens/generated'

type Props = {
    comment: Publication

}

const CommentsByte: FC<Props> = ({ comment ,}) => {
    const [show, setShow] = useState(false)


    return (
    
    
    <Comments key={`${comment?.id}_${comment.createdAt}`}
       comment={comment as Publication} />
       
       
       
       )
}

export default CommentsByte

