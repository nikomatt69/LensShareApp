import nFormatter from '@/lib/nFormatter';
import clsx from 'clsx';
import type { FC, ReactNode } from 'react';

interface Props {
  name: string;
  icon: ReactNode;
  active: boolean;
  count?: number;
  showOnSm?: boolean;
  onClick: () => void;
  className?: string;
}

const TabButton: FC<Props> = ({
  name,
  icon,
  active,
  count,
  className,
  showOnSm = false,
  onClick
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={clsx(
        { 'text-brand bg-brand-100 bg-opacity-100 dark:bg-opacity-20': active },
        'hover:bg-brand-100 flex items-center space-x-2 rounded-lg px-4 py-2 text-sm font-medium text-gray-500 hover:bg-opacity-100 dark:hover:bg-opacity-20 sm:px-3 sm:py-1.5'
      )}
      aria-label={name}
    >
      {icon}
      <span className={clsx({ 'hidden sm:block': !showOnSm })}>{name}</span>
      {count ? (
        <span
          className={clsx(
            { 'bg-brand-200 dark:bg-brand-800': active },
            'rounded-full bg-gray-200 px-2 text-xs dark:bg-gray-800'
          )}
        >
          {nFormatter(count)}
        </span>
      ) : null}
    </button>
  );
};

export default TabButton;
