import React, { useState, useReducer, useCallback } from "react";
import { useMountedRef } from "utils";
interface State<D> {
  error: Error | null;
  data: D | null;
  stat: "idle" | "loaing" | "error" | "success";
}

const defaultInitialState: State<null> = {
  stat: "idle",
  data: null,
  error: null
};

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const moutnedRef = useMountedRef();
  return useCallback(
    (...args: T[]) => (moutnedRef.current ? dispatch(...args) : void 0),
    [dispatch, moutnedRef]
  );
};

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, dispatch] = useReducer(
    (state: State<D>, action: Partial<State<D>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState
    }
  );

  // const mountedRef = useMountedRef();
  const safeDispatch = useSafeDispatch(dispatch);

  const [retry, setRetry] = useState(() => () => {});

  const setData = useCallback(
    (data: D) =>
      safeDispatch({
        data,
        stat: "success",
        error: null
      }),
    [safeDispatch]
  );
  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        stat: "error",
        data: null
      }),
    [safeDispatch]
  );

  const run = useCallback(
    (promise: Promise<D>, runConfig?: { retry: () => Promise<D> }) => {
      if (!promise || !promise.then) {
        throw new Error("promise only");
      }
      safeDispatch({ stat: "loaing" });
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig);
        }
      });

      return promise
        .then(data => {
          setData(data);
          return data;
        })
        .catch(error => {
          setError(error);
          return Promise.reject(error);
        });
    },
    [safeDispatch]
  );

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loaing",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    retry,
    ...state
  };
};
