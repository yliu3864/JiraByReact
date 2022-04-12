import { useUrlQueryParam, useSetUrlSearchParam } from "utils/url";
import { useMemo } from "react";
import { useProject } from "utils/project";
import { useSearchParams } from "react-router-dom";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...param,
        name: param.name || undefined,
        personId: Number(param.personId) || undefined
      }),
      [param]
    ),
    setParam
  ] as const;
};

export const useProjectsQueryKey = () => {
  const [params] = useProjectSearchParams();
  return ["projects", params];
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectModalCreate] = useUrlQueryParam([
    "projectCreate"
  ]);
  const [{ editingProjectId }, setEditingProjectId] = useUrlQueryParam([
    "editingProjectId"
  ]);
  const setUrlParams = useSetUrlSearchParam();
  const { data: editingProject, isLoading } = useProject(
    Number(editingProjectId)
  );
  const open = () => setProjectModalCreate({ projectCreate: true });
  const close = () => {
    setUrlParams({ projectCreate: "", editingProjectId: "" });
  };
  const startEdit = (id: number) =>
    setEditingProjectId({ editingProjectId: id });
  return {
    projectModalOpen: projectCreate === "true" || Boolean(editingProject),
    open,
    close,
    startEdit,
    editingProject,
    isLoading
  };
};
