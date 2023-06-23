import { Matcher } from 'interweave'
import Link from 'next/link'
import React from 'react'
import getLensHandle from '@/utils/functions/getLensHandle'
import { title } from 'process'
import { MarkupLinkProps } from '@/types/app'
import { Profile } from '@/types/lens'

interface MentionProps extends MarkupLinkProps {
  tagProfile: Profile;
  profileId : string;
}


const ChannelLink = ({ ...props }: any,) => {
  const profile = {
    __typename: 'Profile',
    handle: props.display,

    name: null,
    id: props.profileId,
  };
 
  
  return (
    <Link href={`/u/${profile}`}>
      {props.display}
    </Link>
  )
}

export class MentionMatcher extends Matcher {
  replaceWith(match: string, props:any) {
    return React.createElement(ChannelLink,  match,props)
  }

  asTag(): string {
    return 'a'
  }

  match(value: string) {
    return this.doMatch(value, /@[a-zA-Z0-9_.]/, (matches) => {
      return {
        display: matches[0]
      }
    })
  }
}
