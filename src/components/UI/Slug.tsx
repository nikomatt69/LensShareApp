import cn from '@/components/UI/cn';
import type { FC } from 'react';

interface Props {
  slug: string;
  prefix?: string;
  className?: string;
}

const Slug: FC<Props> = ({ slug, prefix, className = '' }) => {
  return (
    <span
      className={cn(
        'from-brand-600 dark:from-brand-400 bg-gradient-to-r to-pink-600 bg-clip-text text-xs text-black dark:to-pink-400 dark:text-white',
        className
      )}
    >
      {prefix}
      {slug}
    </span>
  );
};

export default Slug;
