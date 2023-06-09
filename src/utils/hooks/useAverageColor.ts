import { FastAverageColor } from 'fast-average-color';
import { useCallback, useEffect, useState } from 'react';

const fac = new FastAverageColor();

const useAverageColor = (src: string, check: boolean) => {
  const [color, setColor] = useState('');

  const getColors = useCallback(async () => {
    if (!check) {
      return;
    }
    return fac.getColorAsync(src).then((color) => {
      setColor(color.hex);
    });
  }, [src, check]);

  useEffect(() => {
    getColors();
  }, [getColors]);

  return { color };
};

export default useAverageColor;
