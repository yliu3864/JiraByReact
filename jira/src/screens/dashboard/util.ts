import { useLocation } from "react-router";
import { useProject } from "utils/project";
import { useUrlQueryParam } from "utils/url";
import { useMemo, useEffect, useCallback } from "react";
import { useTask } from "utils/task";
import { useDebounce } from "utils";

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation();
  const id = pathname.match(/projects\/(\d+)/)?.[1];
  return Number(id);
};

export const useProjectInUrl = () => useProject(useProjectIdInUrl());

export const useDashboardSearchParams = () => ({
  projectId: useProjectIdInUrl()
});

export const useDashboardQueryKey = () => [
  "dashboards",
  useDashboardSearchParams()
];

export const useTasksSearchParams = () => {
  const [param, setParam] = useUrlQueryParam([
    "name",
    "typeId",
    "processorId",
    "tagId"
  ]);
  const projectId = useProjectIdInUrl();
  // const debounceName = useDebounce(param.name, 200);

  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name || undefined
    }),
    [projectId, param]
  );
};

export const useTasksQueryKey = () => ["tasks", useTasksSearchParams()];

export const useTasksModal = () => {
  const [{ editingTaskId }, setEditingTaskId] = useUrlQueryParam([
    "editingTaskId"
  ]);
  const { data: editingTask, isLoading } = useTask(Number(editingTaskId));
  const startEdit = useCallback(
    (id: number) => {
      setEditingTaskId({ editingTaskId: id });
    },
    [setEditingTaskId]
  );
  const close = useCallback(() => {
    setEditingTaskId({ editingTaskId: "" });
  }, [setEditingTaskId]);
  return {
    editingTaskId,
    editingTask,
    startEdit,
    close,
    isLoading
  };
};
