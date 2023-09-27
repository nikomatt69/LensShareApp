import cn from '@/components/UI/cn';
import type { ElementType, FC, MouseEvent, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  forceRounded?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  dataTestId?: string;
}

export const Card: FC<CardProps> = ({
  children,
  as: Tag = 'div',
  className = '',
  forceRounded = false,
  dataTestId = '',
  onClick
}) => {
  return (
    <Tag
      className={cn(
        forceRounded ? 'flex rounded-xl' : 'rounded-xl sm:rounded-xl',
        '[#d9dff1f6] rounded-xl border ',
        className
      )}
      onClick={onClick}
    >
      {children}
    </Tag>
  );
};
