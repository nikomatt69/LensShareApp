import type { Profile, Publication } from '@/utils/lens/generatedLenster';


import * as React from 'react';

import tokenList from '../../../node_modules/@superfluid-finance/tokenlist';
import SuperfluidWidget from '../../../node_modules/@superfluid-finance/widget';
import paymentDetails from './paymentDetails';
import { Button } from '../UI/Button';
import { STATIC_ASSETS_URL } from '@/constants';

interface SuperfluidSubscribeProps {
  profile: Profile;
  publication :Publication
}

export function SuperfluidSubscribePub({ profile,publication }: SuperfluidSubscribeProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const walletManager = {
    open: async () => setIsOpen(true),
    isOpen: isOpen
  };

  const customPaymentDetails = paymentDetails.paymentOptions.map((option) => {
    return {
      ...option,
      receiverAddress: publication?.profile?.ownedBy
    };
  });

  return (
    <div>
      <SuperfluidWidget
        productDetails={{
          imageURI: `${STATIC_ASSETS_URL}/images/icon.png`,
          name: 'Superfluid Subscription | ' + publication.id,
          description:
             "Subscribe to this creator's Superfluid stream"
        }}
        paymentDetails={{
          paymentOptions: customPaymentDetails
        }}
        tokenList={tokenList}
        type="dialog"
        walletManager={walletManager}
        theme= {{
      
          
          palette:{
            mode: "dark",
           
           
          }
          
         
         } }
        >
               
          
        
      
        {({ openModal }) => (
          <button
            type="button"
            onClick={() => openModal()}
            className=" text-sx mx-auto justify-between"
          >
            {`$`}
          </button>
          // <Button
          //   className="!px-3 !py-1 text-sm"
          //   outline
          //   onClick={() => openModal()}
          //   variant="super"
          //   aria-label="Subscribe"
          //   icon={<UserRemoveIcon className="w-4 h-4" />}
          // >
          //   {t`Subscribe`}
          // </Button>
        )}
      </SuperfluidWidget>
    </div>
  );
}

export default SuperfluidSubscribePub;