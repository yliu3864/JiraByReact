import React from "react";
import { Dashboard } from "types/dashboard";
import { useTasks } from "utils/task";
import { BugOutlined, EditOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Card, Dropdown, Button, Menu, Modal } from "antd";
import {
  useTasksSearchParams,
  useTasksModal,
  useDashboardQueryKey
} from "./util";
import { CreateTask } from "screens/dashboard/create-task";
import { Task } from "types/task";
import Mark from "components/mark";
import { useDeleteDashboard } from "utils/dashboard";
import { Row } from "components/lib";

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal();
  const { name: keyword } = useTasksSearchParams();
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: "0.5rem", cursor: "pointer" }}
      key={task.id}
    >
      <Mark keyword={keyword} name={task.name} />
      <div>{task.typeId == 1 ? <BugOutlined /> : <EditOutlined />}</div>
    </Card>
  );
};

export const DashboardColumn = React.forwardRef<
  HTMLDivElement,
  { dashboard: Dashboard }
>(({ dashboard, ...props }, ref) => {
  const { data: allTasks } = useTasks(useTasksSearchParams());
  const tasks = allTasks?.filter(task => task.dashboardId === dashboard.id);
  return (
    <Container {...props} ref={ref}>
      <Row between={true}>
        <h3>{dashboard.name}</h3>
        <More dashboard={dashboard} key={dashboard.id} />
      </Row>
      <TasksContainer>
        {tasks?.map(task => (
          <TaskCard task={task} key={task.id} />
        ))}
        <CreateTask dashboardId={dashboard.id} />
      </TasksContainer>
    </Container>
  );
});

const More = ({ dashboard }: { dashboard: Dashboard }) => {
  const { mutateAsync } = useDeleteDashboard(useDashboardQueryKey());
  const startEdit = () => {
    Modal.confirm({
      okText: "Yes",
      cancelText: "No",
      title: "Confirm",
      onOk() {
        return mutateAsync(dashboard.id);
      }
    });
  };
  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type={"link"} onClick={startEdit}>
          delete
        </Button>
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={overlay}>
      <Button type={"link"}>...</Button>
    </Dropdown>
  );
};

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  padding-top: 20px;
`;

const TasksContainer = styled.div`
  overflow: scoll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`;
