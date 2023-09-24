import type { Profile } from '@/utils/lens/generatedLenster';


import * as React from 'react';

import tokenList from '../../../node_modules/@superfluid-finance/tokenlist';
import SuperfluidWidget from '../../../node_modules/@superfluid-finance/widget';
import paymentDetails from './paymentDetails';
import { Button } from '../UI/Button';
import { STATIC_ASSETS_URL } from '@/constants';

interface SuperfluidSubscribeProps {
  profile: Profile;
}

export function SuperfluidSubscribe({ profile }: SuperfluidSubscribeProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const walletManager = {
    open: async () => setIsOpen(true),
    isOpen: isOpen
  };

  const customPaymentDetails = paymentDetails.paymentOptions.map((option) => {
    return {
      ...option,
      receiverAddress: profile?.ownedBy
    };
  });

  return (
    <div>
      <SuperfluidWidget
        productDetails={{
          imageURI: `${STATIC_ASSETS_URL}/images/icon.png`,
          name: 'Superfluid Subscription | ' + profile.name,
          description:
            profile.bio || "Subscribe to this creator's Superfluid stream"
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
            className=" px-4 py-2 text-sm font-bold text-white hover:bg-blue-700"
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

export default SuperfluidSubscribe;
