import * as React from 'react';
import { useAddToHomescreenPrompt } from './useAddToHome';
import { XCircleIcon } from '@heroicons/react/24/outline';
import { MdAddHome } from 'react-icons/md';

export function AddToHome() {
  const [prompt, promptToInstall] = useAddToHomescreenPrompt();
  const [isVisible, setVisibleState] = React.useState(false);

  const hide = () => setVisibleState(false);

  React.useEffect(() => {
    if (prompt) {
      setVisibleState(true);
    }
  }, [prompt]);

  if (!isVisible) {
    return <div />;
  }

  return (
    <div className='space-y-3' onClick={hide}>
      <button onClick={hide}>
        <XCircleIcon className="h-4 w-4" />{' '}
      </button>
      <button onClick={promptToInstall}>
        <MdAddHome className="h-4 w-4" />{' '}
      </button>
    </div>
  );
}
export default AddToHome;
