import useState, { useEffect } from "react";
import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import cleanObject from "utils";
import { useHttp } from "./http";
import { useSearchParams } from "react-router-dom";
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();
  const { run, ...result } = useAsync<Project[]>();

  useEffect(() => {
    run(client("projects", { data: cleanObject(param || {}) }));
  }, [param]);
  return result;
};

export const useEditProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`project/${params.id}`, {
        data: params,
        method: "PATCH"
      })
    );
  };
  return {
    mutate,
    ...asyncResult
  };
};

export const useAddProject = () => {
  const { run, ...asyncResult } = useAsync();
  const client = useHttp();
  const mutate = (params: Partial<Project>) => {
    return run(
      client(`project/${params.id}`, {
        data: params,
        method: "POST"
      })
    );
  };
  return {
    mutate,
    ...asyncResult
  };
};
