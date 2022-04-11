import useState, { useEffect } from "react";
import { useAsync } from "./use-async";
import { Project } from "screens/project-list/list";
import cleanObject from "utils";
import { useHttp } from "./http";
import { useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "react-query";
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[], Error>(["projects", param], () =>
    client("projects", { data: param })
  );
};

export const useEditProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects")
    }
  );
  // const { run, ...asyncResult } = useAsync();
  // const mutate = (params: Partial<Project>) => {
  //   return run(
  //     client(`project/${params.id}`, {
  //       data: params,
  //       method: "PATCH"
  //     })
  //   );
  // };
  // return {
  //   mutate,
  //   ...asyncResult
  // };
};

export const useAddProject = () => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: params
      }),
    {
      onSuccess: () => queryClient.invalidateQueries("projects")
    }
  );
};

export const useProject = (id?: number) => {
  const client = useHttp();
  return useQuery<Project>(
    ["project", { id }],
    () => client(`projects/${id}`),
    {
      enabled: Boolean(id)
    }
  );
};
