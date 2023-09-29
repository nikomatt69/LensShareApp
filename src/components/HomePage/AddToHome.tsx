import * as React from 'react';
import { useAddToHomescreenPrompt } from './useAddToHome';

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
    <div onClick={hide}>
      <button onClick={hide}>Close</button>
      Add To Home
      <button onClick={promptToInstall}>Install</button>
    </div>
  );
}
export default AddToHome;
