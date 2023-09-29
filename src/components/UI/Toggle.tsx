import { Switch } from '@headlessui/react';
import cn from '@/components/UI/cn';
import type { Dispatch, FC } from 'react';

interface Props {
  on: boolean;
  setOn: Dispatch<boolean>;
}

export const Toggle: FC<Props> = ({ on, setOn }) => {
  return (
    <Switch
      checked={on}
      onChange={() => {
        setOn(!on);
      }}
      className={cn(
        on ? 'primary-button' : 'bg-gray-200 dark:bg-gray-700',
        'inline-flex h-[22px] w-[42.5px] cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none'
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          on ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out dark:bg-gray-900/70'
        )}
      />
    </Switch>
  );
};
