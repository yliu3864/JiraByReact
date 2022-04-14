import React from "react";
import { Dashboard } from "types/dashboard";
import { useTasks } from "utils/task";
import { BugOutlined, EditOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Card } from "antd";

export const DashboardColumn = ({ dashboard }: { dashboard: Dashboard }) => {
  const { data: allTasks } = useTasks();
  const tasks = allTasks?.filter(task => task.dashboardId === dashboard.id);
  return (
    <Container>
      <h3>{dashboard.name}</h3>
      <TasksContainer>
        {tasks?.map(task => (
          <Card style={{ marginBottom: "0.5rem" }} key={task.id}>
            <div>{task.name}</div>
            <BugOutlined />
          </Card>
        ))}
      </TasksContainer>
    </Container>
  );
};

const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`;

const TasksContainer = styled.div`
  overflow: scoll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
