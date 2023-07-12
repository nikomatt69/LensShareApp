import { IS_MAINNET } from '@/constants';
import { getModule } from '@/lib/getModule';
import { ApprovedAllowanceAmount } from '@/utils/lens/generatedLenster';
import GetModuleIcon from '@/utils/GetModuleIcon';
import { FC, useState } from 'react';
import AllowanceButton from './AllowanceButton';
import Link from 'next/link';

interface Props {
  module: ApprovedAllowanceAmount;
}

const Module: FC<Props> = ({ module }) => {
  const [allowed, setAllowed] = useState(module?.allowance !== '0x00');
  const POLYGONSCAN_URL = IS_MAINNET
    ? 'https://polygonscan.com'
    : 'https://mumbai.polygonscan.com';

  return (
    <div
      key={module?.module}
      className="block items-center justify-between p-5 sm:flex"
    >
      <div className="mb-3 mr-1.5 overflow-hidden sm:mb-0">
        <div className="flex items-center space-x-2">
          <div className="text-brand">
            <GetModuleIcon module={module?.module} size={4} />
          </div>
          <div className="whitespace-nowrap font-bold">
            {getModule(module?.module).name}
          </div>
        </div>
        <Link
          href={`${POLYGONSCAN_URL}/address/${module?.contractAddress}`}
          className="truncate text-sm text-gray-500"
          target="_blank"
          rel="noreferrer noopener"
        >
          {module?.contractAddress}
        </Link>
      </div>
      <AllowanceButton
        module={module}
        allowed={allowed}
        setAllowed={setAllowed}
      />
    </div>
  );
};

export default Module;
