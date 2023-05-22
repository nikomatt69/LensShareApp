import {Modal} from '@/components/UI/Modal'
import {Tooltip} from '@/components/UI/Tooltip'
import type { FC } from 'react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'
import { LENSSHARE_EMBED_URL} from '@/constants'
import useCopyToClipboard from '@/utils/hooks/useCopyToClipboard'
import { AiOutlineCode } from 'react-icons/ai'
import { PlayIcon } from '@heroicons/react/24/outline'



type Props = {
  videoId: string
  onClose: () => void
}

const EmbedVideo: FC<Props> = ({ videoId, onClose }) => {
  const [showModal, setShowModal] = useState(false)
  const [copy] = useCopyToClipboard()

  const iframeCode = `<iframe width="560" height="315" src="${LENSSHARE_EMBED_URL}/${videoId}?autoplay=1&t=0&loop=0" title="LensShare video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write;" allowfullscreen></iframe>`

  const onCopyCode = () => {
  
    copy(iframeCode)
    toast.success(`Copied to clipboard`)
  }

  const closeModal = () => {
    setShowModal(false)
    onClose()
  }

  const openModal = () => {
    setShowModal(true)
   
  }

  return (
    <div>
      <Modal
        title="Embed Video"
        onClose={closeModal}
        show={showModal}
       
      >
        <div className="mt-2">
          <div className="flex flex-col space-y-3">
            <div className="w-full break-words">
              <iframe
                sandbox="allow-scripts allow-same-origin"
                className="aspect-[16/9] break-words w-full"
                src={`${LENSSHARE_EMBED_URL}/${videoId}`}
                title="LensShare video player"
                allow="accelerometer; autoplay; clipboard-write; gyroscope;"
                allowFullScreen
              />
            </div>
            <div className="col-span-2">
              <button
                type="button"
                onClick={() => onCopyCode()}
                className="select-all rounded-xl border p-4 text-left"
              >
                <code className="select-all break-words  text-xs opacity-60">
                  {iframeCode}
                </code>
              </button>
            </div>
          </div>
        </div>
      </Modal>
      <Tooltip placement="top" content="Embed Video">
        <button
          type="button"
          onClick={() => openModal()}
          className="rounded-full bg-blue-500 p-2.5"
        >
          <PlayIcon className="h-5 w-5 text-black" />
        </button>
      </Tooltip>
    </div>
  )
}

export default EmbedVideo
