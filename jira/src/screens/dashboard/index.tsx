import React, { useCallback } from "react";
import { useDocumentTitle } from "utils";
import { useDashboards, useReorderDashboard } from "utils/dashboard";
import {
  useProjectInUrl,
  useDashboardSearchParams,
  useTasksSearchParams,
  useDashboardQueryKey,
  useTasksQueryKey
} from "screens/dashboard/util";
import { DashboardColumn } from "screens/dashboard/dashboard-column";
import styled from "@emotion/styled";
import SearchPanel from "screens/dashboard/search-panel";
import { ScreenContainer } from "components/lib";
import { useTasks, useReorderTask } from "utils/task";
import { Spin } from "antd";
import { CreateDashboard } from "screens/dashboard/create-dashboard";
import TaskModal from "./task-modal";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
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
  const onDragEnd = useDragEnd();

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <ScreenContainer>
        <h1>{currentProject?.name} dashboard</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <DoashboardContainer>
            <Drop
              type={"COLUMN"}
              direction={"horizontal"}
              droppableId={"dashboard"}
            >
              <DropChild style={{ display: "flex" }}>
                {dashboards?.map((dashboard, index) => (
                  <Drag
                    key={dashboard.id}
                    draggableId={"dashboard" + dashboard.id}
                    index={index}
                  >
                    <DashboardColumn dashboard={dashboard} key={dashboard.id} />
                  </Drag>
                ))}
              </DropChild>
            </Drop>
            <CreateDashboard />
          </DoashboardContainer>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  );
}

export const useDragEnd = () => {
  const { data: dashboards } = useDashboards(useDashboardSearchParams());
  const { mutate: reorderDashboard } = useReorderDashboard(
    useDashboardQueryKey()
  );
  const { mutate: reorderTask } = useReorderTask(useTasksQueryKey());
  const { data: allTasks = [] } = useTasks(useTasksSearchParams());

  return useCallback(
    ({ source, destination, type }: DropResult) => {
      if (!destination) {
        return;
      }
      if (type === "COLUMN") {
        const fromId = dashboards?.[source.index].id;
        const toId = dashboards?.[destination.index].id;
        if (!fromId || !toId || fromId == toId) {
          return;
        }
        const type = destination.index > source.index ? "after" : "before";
        reorderDashboard({ fromId, referenceId: toId, type });
      }
      if (type === "ROW") {
        const fromDashboardId = +source.droppableId;
        const toDashboardId = +destination.droppableId;
        if (fromDashboardId !== toDashboardId) {
          return;
        }
        const fromTask = allTasks.filter(
          task => task.dashboardId === fromDashboardId
        )[source.index];
        const toTask = allTasks.filter(
          task => task.dashboardId === fromDashboardId
        )[destination.index];
        if (fromTask?.id === toTask?.id) {
          return;
        }
        reorderTask({
          fromId: fromTask.id,
          referenceId: toTask.id,
          fromDashboardId,
          toDashboardId,
          type:
            fromDashboardId === toDashboardId &&
            destination.index > source.index
              ? "after"
              : "before"
        });
      }
    },
    [dashboards, reorderDashboard, allTasks, reorderTask]
  );
};

export const DoashboardContainer = styled("div")`
  display: flex;
  overflow-x: scroll;
  flex: 1;
`;
