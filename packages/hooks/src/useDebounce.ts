import { useCallback, useRef } from "react";

const useDebounce = <T extends any[]>(
  callback = (...args: T) => {},
  wait: number = 100
) => {
  const timerRef = useRef<number | NodeJS.Timeout>();

  const debounce = useCallback(
    (...args: T): void => {
      clearTimeout(timerRef.current as number);
      timerRef.current = setTimeout(() => {
        callback(...args);
      }, wait);
    },
    [callback, wait]
  );

  return debounce;
};

export default useDebounce;