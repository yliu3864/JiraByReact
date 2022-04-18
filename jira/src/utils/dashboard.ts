import { useHttp } from "./http";
import { useQuery, useMutation, useQueryClient, QueryKey } from "react-query";
import { Dashboard } from "../types/dashboard";
import { useTaskTypes } from "./task-type";
import { BugOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";
import { useAddConfig, useDeleteConfig } from "./use-optimistic-options";

const TaskTypesIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find(taskType => taskType.id === id)?.name;

  // return <div>1123</div>;

  // return name === "task" ? <BugOutlined /> : <EditOutlined />;
};

export const useDashboards = (param?: Partial<Dashboard>) => {
  const client = useHttp();

  return useQuery<Dashboard[], Error>(["dashboards", param], () =>
    client("dashboards", { data: param })
  );
};

export const useAddDashboard = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (params: Partial<Dashboard>) =>
      client(`dashboards`, {
        method: "POST",
        data: params
      }),
    useAddConfig(queryKey)
  );
};

export const useDeleteDashboard = (queryKey: QueryKey) => {
  const client = useHttp();

  return useMutation(
    (id: number) =>
      client(`dashboards/${id}`, {
        method: "DELETE"
      }),
    useDeleteConfig(queryKey)
  );
};
