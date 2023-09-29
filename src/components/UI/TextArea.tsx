import type { ComponentProps } from 'react';
import { forwardRef, useId } from 'react';

import { FieldError } from './Form';

interface Props extends ComponentProps<'textarea'> {
  label?: string;
}

export const TextArea = forwardRef<HTMLTextAreaElement, Props>(
  function TextArea({ label, ...props }, ref) {
    const id = useId();

    return (
      <label htmlFor={id}>
        {label && (
          <div className="mb-1 flex items-center space-x-1.5">
            <div className="font-medium text-gray-800 dark:text-gray-200">
              {label}
            </div>
          </div>
        )}
        <textarea
          id={id}
          className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2 shadow-sm outline-none ring-0 focus-within:ring-0 focus:ring-0 focus-visible:ring-0  disabled:bg-gray-500 disabled:bg-opacity-20 disabled:opacity-60 dark:bg-gray-900 dark:bg-gray-900/70"
          ref={ref}
          {...props}
        />
        {props.name && <FieldError name={props.name} />}
      </label>
    );
  }
);
