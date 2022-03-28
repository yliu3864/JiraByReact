import React, { useState } from "react";
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

export const useAsync = <D>(initialState?: State<D>) => {
  const [state, setState] = useState<State<D>>({
    ...defaultInitialState,
    ...initialState
  });

  const setData = (data: D) =>
    setState({
      data,
      stat: "success",
      error: null
    });

  const setError = (error: Error) =>
    setState({
      error,
      stat: "error",
      data: null
    });

  const run = (promise: Promise<D>) => {
    if (!promise || !promise.then) {
      throw new Error("promise only");
    }
    setState({ ...state, stat: "loaing" });
    return promise
      .then(data => {
        setData(data);
        return data;
      })
      .catch(error => {
        setError(error);
        return error;
      });
  };

  return {
    isIdle: state.stat === "idle",
    isLoading: state.stat === "loaing",
    isError: state.stat === "error",
    isSuccess: state.stat === "success",
    run,
    setData,
    setError,
    ...state
  };
};
