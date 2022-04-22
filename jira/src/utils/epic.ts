import { useHttp } from "./http";
import { useQuery, useMutation, useQueryClient, QueryKey } from "react-query";
import { Epic } from "../types/epic";
import { useTaskTypes } from "./task-type";
import { BugOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";
import {
  useAddConfig,
  useDeleteConfig,
  useReorderConfig
} from "./use-optimistic-options";

export const useEpics = (param?: Partial<Epic>) => {
  const client = useHttp();

  return useQuery<Epic[], Error>(["epics", param], () =>
    client("epics", { data: param })
  );
};

export const useAddEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Epic>) =>
      client(`epics`, {
        method: "POST",
        data: params
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteEpic = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (id: number) =>
      client(`epics/${id}`, {
        method: "DELETE"
      }),
    useDeleteConfig(queryKey)
  );
};
