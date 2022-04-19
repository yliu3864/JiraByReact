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
import { DragDropContext } from "react-beautiful-dnd";
import { DropChild, Drag, Drop } from "components/drag-and-drop";

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
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <h1>{currentProject?.name} dashboard</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <Drop
            type={"COLUMN"}
            direction={"horizontal"}
            droppableId={"dashboard"}
          >
            <DoashboardContainer>
              {dashboards?.map((dashboard, index) => (
                <Drag
                  key={dashboard.id}
                  draggableId={"dashboard" + dashboard.id}
                  index={index}
                >
                  <DashboardColumn dashboard={dashboard} key={dashboard.id} />
                </Drag>
              ))}
              <CreateDashboard />
            </DoashboardContainer>
          </Drop>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
}

export const DoashboardContainer = styled(DropChild)`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
