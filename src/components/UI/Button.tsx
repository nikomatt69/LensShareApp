import clsx from 'clsx';
import type { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from 'react';
import { forwardRef } from 'react';

interface Props extends DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'super' | 'danger';
  outline?: boolean;
  light?: boolean;
  loading?: boolean;
  icon?: ReactNode;
  children?: ReactNode;
  className?: string;
}

export const Button = forwardRef<HTMLButtonElement, Props>(function Button(
  { className = '', size = 'md', variant = 'primary', outline, light, loading, icon, children, ...rest },
  ref
) {
  return (
    <button
      ref={ref}
      className={clsx(
        {
          'bg-blue-500 hover:bg-[#57B8FF] border text-white focus:ring-blue-400':
            !outline && !light && variant === 'primary',
          'bg-gray-500 hover:bg-gray-600 border border-gray-600 text-white focus:ring-gray-400':
            !outline && !light && variant === 'secondary',
          'bg-green-500 hover:bg-green-400 border border-green-600 text-white focus:ring-green-400':
            !outline && !light && variant === 'success',
          'bg-yellow-500 hover:bg-yellow-400 border border-yellow-600 text-white focus:ring-yellow-400':
            !outline && !light && variant === 'warning',
          'bg-pink-700 hover:bg-pink-400 border border-pink-600 text-white focus:ring-pink-400':
            !outline && !light && variant === 'super',
          'bg-red-700 hover:bg-red-400 border border-red-600 text-white focus:ring-red-400':
            !outline && !light && variant === 'danger',
          'border border-blue-700 text-blue hover:bg-blue-100 focus:ring-blue-400':
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
          'border-none !shadow-none text-gray-700': light,
          'px-2 py-0.5': size === 'sm',
          'px-3 py-1': size === 'md',
          'px-4 py-1.5': size === 'lg',
          'flex items-center space-x-1.5': icon && children
        },
        'rounded-full font-bold disabled:opacity-50 shadow-sm focus:ring-2 focus:ring-opacity-50 focus:ring-offset-1 outline-none',
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