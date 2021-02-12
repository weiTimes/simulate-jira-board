import { useEffect, useState } from "react";

export const isFalsy = (v: unknown): boolean => (v === 0 ? false : !v);

export const isVoid = (v: unknown): boolean =>
  v === undefined || v === null || v === "";

export const cleanObject = (obj: { [key: string]: unknown }) => {
  // Object.assign({}, obj);
  const result = { ...obj };

  Object.keys(result).forEach((key) => {
    const value = result[key];

    if (isVoid(value)) {
      delete result[key];
    }
  });

  return result;
};

export const useMount = (cb: () => void) => {
  useEffect(() => {
    cb();
    // TODO: 依赖项里加上 cb 会造成不断地重新渲染，这和 useCallback 和 useMemo 有关系
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

// 异步请求状态的维护
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loading" | "success" | "error";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  error: null,
  data: null,
};

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState,
  });

  const setData = (data: D) => {
    setState({
      stat: "success",
      data,
      error: null,
    });
  };

  const setError = (error: Error) => {
    setState({
      stat: "error",
      error,
      data: null,
    });
  };

  // 用来触发请求
  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("请传入 promise 类型的参数");
    }

    setState({
      ...state,
      stat: "loading",
    });

    return promise
      .then((data) => {
        setData(data);
        return data;
      })
      .catch((error) => {
        setError(error);
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loading",
    isSuccess: state.stat === "success",
    isError: state.stat === "error",
    run,
    setData,
    setError,
    ...state,
  };
};
