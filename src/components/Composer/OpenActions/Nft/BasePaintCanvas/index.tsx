import { CursorArrowRaysIcon } from '@heroicons/react/24/outline';

import Link from 'next/link';
import { type FC, useState, Key } from 'react';

import urlcat from 'urlcat';

import Mint, { useBasePaintMintStore } from './Mint';
import NftShimmer from './Shimmer';
import { BasePaintCanvasMetadata } from '@/types/nft';
import { Publication } from '@/utils/lens/generatedLenster';
import useBasePaintCanvas from '@/utils/hooks/basepaint/useBasePaintCanvas';
import { Card } from '@/components/UI/Card';
import stopEventPropagation from '@/lib/stopEventPropagation';
import { Tooltip } from '@/components/UI/Tooltip';
import { STATIC_IMAGES_URL } from '@/constants';
import { Button } from '@/components/UI/Button';
import { Modal } from '@/components/UI/Modal';
import { BASEPAINT_CONTRACT } from '@/utils/data/contracts';

interface BasePaintCanvasProps {
  nftMetadata: BasePaintCanvasMetadata;
  publication: Publication;
}

const BasePaintCanvas: FC<BasePaintCanvasProps> = ({
  nftMetadata,
  publication
}) => {
  const { id } = nftMetadata;
  const [showMintModal, setShowMintModal] = useState(false);
  const { setQuantity } = useBasePaintMintStore();

  const {
    data: canvas,
    loading,
    error
  } = useBasePaintCanvas({
    id,
    enabled: Boolean(id)
  });

  if (loading) {
    return <NftShimmer />;
  }

  if (!canvas) {
    return null;
  }

  if (error) {
    return null;
  }

  const { canMint, canContribute, bitmap, theme } = canvas;

  return (
    <Card
      className="mt-3 flex-col"
      forceRounded
      onClick={(event) => stopEventPropagation(event)}
    >
      <img
        src={`data://image/gif;base64,${bitmap.gif}`}
        className="h-[400px] max-h-[400px] w-full rounded-t-xl object-cover"
        style={{ imageRendering: 'pixelated' }}
      />
      <div className="flex-col items-center justify-between border-t px-3 py-2 dark:border-gray-700">
        <div className="mr-5 flex py-2 flex-wrap items-center gap-2">
          
          <div className="text-sm font-serif">
            Day #{canvas.id}: {theme}
          </div>
         
        </div>
        {canMint ? (
          <>
            <Button
              className="text-xs"
              icon={<CursorArrowRaysIcon className="h-4 w-4" />}
              size="sm"
              onClick={() => {
                setQuantity(1);
                setShowMintModal(true);
               
              }}
            >
              Mint
            </Button>
            <Modal
              title={`Mint on BasePaint`}
              show={showMintModal}
              icon={<CursorArrowRaysIcon className="text-brand h-5 w-5" />}
              onClose={() => setShowMintModal(false)}
            >
              <Mint canvas={canvas} publication={publication} />
            </Modal>
          </>
        ) : canContribute ? (
          <Link
            href={urlcat('https://basepaint.art/mint/:id', { id: canvas.id })}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="text-xs"
              icon={<CursorArrowRaysIcon className="h-4 w-4" />}
              size="sm"
              
            >
              Contribute
            </Button>
          </Link>
        ) : (
          <Link
            href={urlcat('https://opensea.io/assets/base/:contract/:token', {
              contract: BASEPAINT_CONTRACT,
              token: canvas.id
            })}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              className="text-xs"
              icon={<CursorArrowRaysIcon className="h-4 w-4" />}
              size="sm"
            
            >
              View on OpenSea
            </Button>
          </Link>
        )}
      </div>
    </Card>
  );
};

export default BasePaintCanvas;
