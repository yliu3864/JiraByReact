import { useHttp } from "./http";
import { useQuery, useMutation, useQueryClient, QueryKey } from "react-query";
import { Dashboard } from "../types/dashboard";

export const useDashboards = (param?: Partial<Dashboard>) => {
  const client = useHttp();

  return useQuery<Dashboard[], Error>(["dashboards", param], () =>
    client("dashboards", { data: param })
  );
};
