import Link from 'next/link';
import type { ReactElement } from 'react';
import React from 'react';
import { POLYGONSCAN_URL } from '@/constants';

const AddressExplorerLink = ({
  address,
  children
}: {
  address: string;
  children: ReactElement;
}) => {
  return (
    <Link
      href={`${POLYGONSCAN_URL}/address/${address}`}
      rel="noreferer noreferrer"
      target="_blank"
    >
      {children}
    </Link>
  );
};

export default AddressExplorerLink;
