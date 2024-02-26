import { useEffect, useRef } from 'react';

export const useFirstRender = (callback: () => void, deps: any[]) => {
  const ref = useRef(true);

  useEffect(() => {
    const isFirstRender = ref.current;

    if (isFirstRender) {
      ref.current = false;
      callback();
    }
  }, [ref, ...deps]);
};
