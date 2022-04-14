import { useHttp } from "./http";
import { useQuery, useMutation, useQueryClient, QueryKey } from "react-query";
import { TaskType } from "types/task-type";

export const useTaskTypes = () => {
  const client = useHttp();

  return useQuery<TaskType[], Error>(["taskTypes"], () => client("taskTypes"));
};
