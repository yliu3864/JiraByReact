import { useProjectIdInUrl } from "../dashboard/util";

export const useEpicSearchParams = () => ({
  projectId: useProjectIdInUrl()
});

export const useEpicQueryKey = () => ["epics", useEpicSearchParams()];
