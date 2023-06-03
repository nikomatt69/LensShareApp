import { Dialog, Transition } from '@headlessui/react'
import clsx from 'clsx'
import type { FC } from 'react'
import React, { Fragment } from 'react'
import { MdOutlineClose } from 'react-icons/md'

type Props = {
  show: boolean
  title?: React.ReactNode
  children: React.ReactNode
  panelClassName?: string
  autoClose?: boolean
  onClose?: () => void
}

const FullScreenModal: FC<Props> = ({
  show,
  onClose,
  children,
  title,
  panelClassName,
  autoClose = true
}) => {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-20"
        onClose={() => (onClose && !autoClose ? onClose?.() : null)}
      >

        <div className="fixed inset-0 ">
          <div className="flex h-full min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={clsx(
                  'bg-secondary w-full transform text-left align-middle shadow-xl transition-all h-full',
                  panelClassName
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default FullScreenModal
