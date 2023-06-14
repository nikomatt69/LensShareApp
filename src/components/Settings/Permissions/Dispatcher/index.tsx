import React from 'react'
import Toggle from './Toggle'
import { APP_NAME } from '@/constants'

const DispatcherPermissions = () => {
  return (
    <div className="flex flex-wrap items-center justify-end md:justify-between">
      <div className="mb-2">
        <h1 className="mb-1 text-xl font-semibold">Dispatcher</h1>
        <p className="opacity-80">
          Dispacher helps interact with {APP_NAME} without signing any
          of your transactions.
        </p>
      </div>
      <div className="mt-3 flex justify-end">
        <Toggle />
      </div>
    </div>
  )
}

export default DispatcherPermissions
