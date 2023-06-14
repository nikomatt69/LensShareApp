import { useApolloClient } from '@apollo/client'

import clsx from 'clsx'
import {
  useAddProfileInterestMutation,
  useProfileInterestsQuery,
  useRemoveProfileInterestMutation
} from '@/utils/lens'
import React, { useEffect } from 'react'

import sanitizeProfileInterests from '@/utils/functions/sanitizeProfileInterests'
import { useAppStore } from '@/store/app'
import Loader from '@/components/UI/Loader'

const MAX_TOPICS_ALLOWED = 12

const Topics = () => {
  const currentProfile = useAppStore((state) => state.currentProfile)



  const { cache } = useApolloClient()
  const { data, loading } = useProfileInterestsQuery()
  const [addProfileInterests] = useAddProfileInterestMutation()
  const [removeProfileInterests] = useRemoveProfileInterestMutation()

  const updateCache = (interests: string[]) => {
    cache.modify({
      id: `Profile:${currentProfile?.id}`,
      fields: { interests: () => interests }
    })
  }

  const interestsData = (data?.profileInterests as string[]) || []
  const selectedTopics = currentProfile?.interests ?? []

  const onSelectTopic = (topic: string) => {
    try {
      const variables = {
        request: {
          profileId: currentProfile?.id,
          interests: [topic]
        }
      }
      if (!selectedTopics.includes(topic)) {
        const interests = [...selectedTopics, topic]
        updateCache(interests)

        return addProfileInterests({ variables })
      }
      const topics = [...selectedTopics]
      topics.splice(topics.indexOf(topic), 1)
      updateCache(topics)

      removeProfileInterests({ variables })
    } catch { }
  }

  return (
    <div className="flex flex-col space-y-3">
      {loading && <Loader/>}
      {sanitizeProfileInterests(interestsData)?.map(
        ({ category, subCategories }) => (
          <div className="w-full space-y-2" key={category.id}>
            <h2 className="text-sm font-medium capitalize">{category.label}</h2>
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                className={clsx(
                  'flex items-center justify-between rounded-full border border-gray-300 px-3 py-0.5 text-sm capitalize focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700',
                  {
                    '!border-green-500 text-green-500':
                      selectedTopics.includes(category.id)
                  }
                )}
                disabled={
                  !selectedTopics.includes(category.id) &&
                  selectedTopics.length === MAX_TOPICS_ALLOWED
                }
                onClick={() => onSelectTopic(category.id)}
              >
                {category.label}
              </button>
              {subCategories?.map((subCategory) => (
                <button
                  type="button"
                  disabled={
                    !selectedTopics.includes(subCategory.id) &&
                    selectedTopics.length === MAX_TOPICS_ALLOWED
                  }
                  className={clsx(
                    'flex items-center justify-between rounded-full border border-gray-300 px-3 py-0.5 text-sm capitalize focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-700',
                    {
                      '!border-green-500 text-green-500':
                        selectedTopics.includes(subCategory.id)
                    }
                  )}
                  key={subCategory.id}
                  onClick={() => onSelectTopic(subCategory.id)}
                >
                  {subCategory.label}
                </button>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  )
}

export default Topics
