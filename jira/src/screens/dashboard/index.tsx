import React from "react";
import { useDocumentTitle } from "utils";
import { useDashboards } from "utils/dashboard";
import {
  useProjectInUrl,
  useDashboardSearchParams,
  useTasksSearchParams
} from "screens/dashboard/util";
import { DashboardColumn } from "screens/dashboard/dashboard-column";
import styled from "@emotion/styled";
import SearchPanel from "screens/dashboard/search-panel";
import { ScreenContainer } from "components/lib";
import { useTasks } from "utils/task";
import { Spin } from "antd";
import { CreateDashboard } from "screens/dashboard/create-dashboard";
import TaskModal from "./task-modal";

export default function DashboardScreen() {
  useDocumentTitle("Dashboard");
  const { data: dashboards } = useDashboards(useDashboardSearchParams());
  const {
    data: currentProject,
    isLoading: dashboardIsLoading
  } = useProjectInUrl();
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams());
  const isLoading = taskIsLoading || dashboardIsLoading;

  return (
    <ScreenContainer>
      <h1>{currentProject?.name} dashboard</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size={"large"} />
      ) : (
        <DoashboardContainer>
          {dashboards?.map(dashboard => (
            <DashboardColumn dashboard={dashboard} key={dashboard.id} />
          ))}
          <CreateDashboard />
        </DoashboardContainer>
      )}
      <TaskModal />
    </ScreenContainer>
  );
}

export const DoashboardContainer = styled.div`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
