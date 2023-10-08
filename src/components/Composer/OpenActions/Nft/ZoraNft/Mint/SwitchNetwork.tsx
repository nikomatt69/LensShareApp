import { Button } from '@/components/UI/Button';
import { ArrowsRightLeftIcon } from '@heroicons/react/24/outline';


import type { FC } from 'react';
import toast from 'react-hot-toast';
import { useSwitchNetwork } from 'wagmi';

interface SwitchNetworkProps {
  toChainId: number;
  title?: string;
  className?: string;
  onSwitch?: () => void;
}

const SwitchNetwork: FC<SwitchNetworkProps> = ({
  toChainId,
  title = `Switch Network`,
  className = '',
  onSwitch
}) => {
  const { switchNetwork } = useSwitchNetwork();

  return (
    <Button
      className={className}
      type="button"
      variant="danger"
      icon={<ArrowsRightLeftIcon className="h-4 w-4" />}
      onClick={() => {
        onSwitch?.();
        if (switchNetwork) {
          switchNetwork(toChainId);
        } else {
          toast.error(`Please change your network wallet!`);
        }
       
      }}
    >
      {title}
    </Button>
  );
};

export default SwitchNetwork;
