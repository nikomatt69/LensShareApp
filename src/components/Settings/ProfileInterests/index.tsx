import React from 'react'

import Topics from './Topics'

const ProfileInterests = () => {
  return (
    <div className="space-y-6 rounded-sm p-5">
      <div className="mb-5">
        <h1 className="mb-1 text-xl font-semibold">Interests</h1>
        <p className="text opacity-80">
          There is so much good content on Lenstik, it may be hard to find
          what’s most relevant to you from time to time. That’s where profile
          interests can help curate content the way you like.
        </p>
      </div>
      <Topics />
    </div>
  )
}

export default ProfileInterests
