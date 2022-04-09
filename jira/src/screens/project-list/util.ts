import { useUrlQueryParam } from "utils/url";
import { useMemo } from "react";

export const useProjectSearchParams = () => {
  const [param, setParam] = useUrlQueryParam(["name", "personId"]);
  return [
    useMemo(
      () => ({
        ...param,
        personId: Number(param.personId) || undefined
      }),
      [param]
    ),
    setParam
  ] as const;
};

export const useProjectModal = () => {
  const [{ projectCreate }, setProjectModalCreate] = useUrlQueryParam([
    "projectCreate"
  ]);
  const open = () => setProjectModalCreate({ projectCreate: true });
  const close = () => setProjectModalCreate({ projectCreate: undefined });
  return {
    projectModalOpen: projectCreate === "true",
    open,
    close
  };
};
