import { useHttp } from "./http";
import { useQuery, useMutation, useQueryClient, QueryKey } from "react-query";
import { Dashboard } from "../types/dashboard";
import { useTaskTypes } from "./task-type";
import { BugOutlined, EditOutlined } from "@ant-design/icons";
import React from "react";

const TaskTypesIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes();
  const name = taskTypes?.find(taskType => taskType.id === id)?.name;
  if (!name) {
    return null;
  }

  // return <div>1123</div>;

  // return name === "task" ? <BugOutlined /> : <EditOutlined />;
};

export const useDashboards = (param?: Partial<Dashboard>) => {
  const client = useHttp();

  return useQuery<Dashboard[], Error>(["dashboards", param], () =>
    client("dashboards", { data: param })
  );
};
