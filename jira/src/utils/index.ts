import { useEffect, useState } from "react";

export const isFalsy = (value: unknown) => (value === 0 ? false : !value);
export default function cleanObject(object: Object) {
  const result = { ...object };
  Object.keys(result).forEach(key => {
    //@ts-ignore
    const value = result[key];
    if (isFalsy(value)) {
      //@ts-ignore
      delete result[key];
    }
  });
  return result;
}

export const useMount = (callBack: () => void) => {
  useEffect(() => {
    callBack();
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timeout);
  }, [value, delay]);
  return debouncedValue;
};

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray);
  return {
    value,
    setValue,
    add: (item: T) => [...value, item],
    clear: () => setValue([]),
    removeIndex: (index: number) => {
      const copy = [...value];
      copy.slice(index, 1);
      setValue(copy);
    }
  };
};
