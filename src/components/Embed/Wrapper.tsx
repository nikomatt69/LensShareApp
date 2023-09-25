import stopEventPropagation from '@/lib/stopEventPropagation';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';
import { Card } from '../UI/Card';
import cn from '../UI/cn';

interface WrapperProps {
  children: ReactNode;
  className?: string;
  dataTestId?: string;
  zeroPadding?: boolean;
}

const Wrapper: FC<WrapperProps> = ({
  children,
  className = '',
  dataTestId = '',
  zeroPadding = false
}) => (
  <Card
    className={cn('mt-3 cursor-auto', className, { 'p-5': !zeroPadding })}
    forceRounded
    dataTestId={dataTestId}
    onClick={stopEventPropagation}
  >
    {children}
  </Card>
);

export default Wrapper;
