import React from "react";
import { Dashboard } from "types/dashboard";
import { useTasks } from "utils/task";
import { useTasksSearchParams } from "./util";
export const DashboardColumn = ({ dashboard }: { dashboard: Dashboard }) => {
  const { data: allTasks } = useTasks();
  const tasks = allTasks?.filter(task => task.dashboardId === dashboard.id);
  return (
    <div>
      <h3>{dashboard.name}</h3>
      {tasks?.map(task => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  );
};
