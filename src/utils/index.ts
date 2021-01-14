import { useEffect, useState } from "react";

export const isFalsy = (v: unknown): boolean => (v === 0 ? false : !v);

export const cleanObject = (obj: object) => {
  // Object.assign({}, obj);
  const result = { ...obj };

  Object.keys(result).forEach((key) => {
    // @ts-ignore
    const value = result[key];

    if (isFalsy(value)) {
      // @ts-ignore
      delete result[key];
    }
  });

  return result;
};

export const useMount = (cb: () => void) => {
  useEffect(() => {
    cb();
  }, []);
};

export const useDebounce = <V>(value: V, delay?: number) => {
  const [useDebounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(value);
    }, delay);

    // 在上一个 useEffect 执行完执行
    return () => clearTimeout(timer);
  }, [value, delay]);

  return useDebounceValue;
};

export const useArray = <O>(
  arr: O[]
): {
  value: O[];
  clear: () => void;
  removeIndex: (index: number) => void;
  add: (value: O) => void;
} => {
  const [value, setValue] = useState([...arr]);

  function clear() {
    setValue([]);
  }

  function removeIndex(index: number) {
    const copyArray = [...value];
    copyArray.splice(index, 1);
    setValue(copyArray);
  }

  function add(o: O) {
    setValue([...value, o]);
  }

  return { value, clear, removeIndex, add };
};
