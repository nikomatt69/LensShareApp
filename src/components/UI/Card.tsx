import clsx from 'clsx';
import type { ElementType, FC, MouseEvent, ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  forceRounded?: boolean;
  onClick?: (event: MouseEvent<HTMLDivElement>) => void;
  
}

export const Card: FC<CardProps> = ({
  children,
  as: Tag = 'div',
  className = '',
  forceRounded = false,
  onClick
}) => {
    return (
        <Tag
            className={clsx(
                forceRounded ? 'flex rounded-xl' : 'rounded-none sm:rounded-xl',
                'border  [#d9dff1f6] ',
                className
            )}
            onClick={onClick}
        >
            {children}
        </Tag>
    );
};