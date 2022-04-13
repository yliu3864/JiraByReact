import useState, { useEffect } from "react";
import { useAsync } from "./use-async";
import { Project } from "types/project";
import cleanObject from "utils";
import { useHttp } from "./http";
import { useSearchParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient, QueryKey } from "react-query";
import { useProjectSearchParams } from "screens/project-list/util";
import {
  useEditConfig,
  useAddConfig,
  useDeleteConfig
} from "./use-optimistic-options";
export const useProjects = (param?: Partial<Project>) => {
  const client = useHttp();

  return useQuery<Project[], Error>(["projects", param], () =>
    client("projects", { data: param })
  );
};

export const useEditProject = (queryKey: QueryKey) => {
  const client = useHttp();
  const queryClient = useQueryClient();

  return useMutation(
    (params: Partial<Project>) =>
      client(`projects/${params.id}`, {
        method: "PATCH",
        data: params
      }),
    useEditConfig(queryKey)
    // {
    // onSuccess: () => queryClient.invalidateQueries("projects")
    // }
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

export const useAddProject = (queryKey: QueryKey) => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (params: Partial<Project>) =>
      client(`projects`, {
        method: "POST",
        data: params
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteProject = (queryKey: QueryKey) => {
  const client = useHttp();
  const queryClient = useQueryClient();
  return useMutation(
    (id: number) =>
      client(`projects/${id}`, {
        method: "DELETE"
      }),
    useDeleteConfig(queryKey)
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
