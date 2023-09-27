import cn from '@/components/UI/cn';
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import React from 'react';
import { forwardRef } from 'react';

interface Props
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  size?: 'sm' | 'md' | 'lg';
  variant?:
    | 'primary'
    | 'secondary'
    | 'success'
    | 'warning'
    | 'super'
    | 'danger';
  outline?: boolean;
  light?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  {
    className = '',
    size = 'md',
    variant = 'primary',
    outline,
    light,
    loading,
    icon,
    children,
    ...rest
  },
  ref
) {
  return (
    <button
      ref={ref}
      className={cn(
        {
          'border bg-blue-700 text-white hover:bg-[#57B8FF] focus:ring-blue-400':
            !outline && !light && variant === 'primary',
          'border border-gray-600 bg-gray-500 text-white hover:bg-gray-600 focus:ring-gray-400':
            !outline && !light && variant === 'secondary',
          'border border-green-600 bg-green-500 text-white hover:bg-green-400 focus:ring-green-400':
            !outline && !light && variant === 'success',
          'border border-yellow-600 bg-yellow-500 text-white hover:bg-yellow-400 focus:ring-yellow-400':
            !outline && !light && variant === 'warning',
          'border border-pink-600 bg-pink-700 text-white hover:bg-pink-400 focus:ring-pink-400':
            !outline && !light && variant === 'super',
          'border border-red-600 bg-red-700 text-white hover:bg-red-400 focus:ring-red-400':
            !outline && !light && variant === 'danger',
          'text-blue border border-blue-700 hover:bg-blue-100 focus:ring-blue-400':
            outline && !light && variant === 'primary',
          'border border-gray-700 text-gray-700 hover:bg-gray-100 focus:ring-gray-400':
            outline && !light && variant === 'secondary',
          'border border-green-700 text-green-700 hover:bg-green-100 focus:ring-green-400':
            outline && !light && variant === 'success',
          'border border-yellow-700 text-yellow-700 hover:bg-yellow-100 focus:ring-yellow-400':
            outline && !light && variant === 'warning',
          'border border-pink-700 text-pink-700 hover:bg-pink-100 focus:ring-pink-400':
            outline && !light && variant === 'super',
          'border border-red-700 text-red-700 hover:bg-red-100 focus:ring-red-400':
            outline && !light && variant === 'danger',
          'border-none text-gray-700 !shadow-none': light,
          'px-2 py-0.5': size === 'sm',
          'px-3 py-1': size === 'md',
          'px-4 py-1.5': size === 'lg',
          'flex items-center space-x-1.5': icon && children
        },
        'rounded-full font-bold shadow-sm outline-none focus:ring-2 focus:ring-opacity-50 focus:ring-offset-1 disabled:opacity-50',
        className
      )}
      disabled={loading}
      type={rest.type}
      {...rest}
    >
      {icon}
      <div>{children}</div>
    </button>
  );
});
