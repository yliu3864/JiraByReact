import React, { useState } from "react";
import { ScreenContainer, Row } from "components/lib";
import { useProjectInUrl } from "screens/dashboard/util";
import { useEpics, useDeleteEpic } from "utils/epic";
import { useEpicQueryKey, useEpicSearchParams } from "screens/epic/util";
import { List, Button, Modal } from "antd";
import dayjs from "dayjs";
import { useTasks } from "utils/task";
import { Link } from "react-router-dom";
import CreateEpic from "./create-epic";
import { Epic } from "types/epic";

export default function EpicScreen() {
  const { data: currentProject } = useProjectInUrl();
  const { data: epics } = useEpics(useEpicSearchParams());
  const { data: tasks } = useTasks({ projectId: currentProject?.id });
  const { mutate: deleteEpic } = useDeleteEpic(useEpicQueryKey());
  const [epicCreateOpen, setEpicCreateOpen] = useState(false);

  const confirmDeleteEpic = (epic: Epic) => {
    Modal.confirm({
      title: `Confirm delete: ${epic.name}`,
      content: "Click to confirm",
      okText: "Yes",
      onOk() {
        // deleteEpic({ id: epic.id });
      }
    });
  };

  return (
    <ScreenContainer>
      <Row between={true}>
        <h1>{currentProject?.name}</h1>
        <Button type={"link"} onClick={() => setEpicCreateOpen(true)}>
          Create epic
        </Button>
      </Row>

      <List
        style={{ overflow: "scroll" }}
        dataSource={epics}
        itemLayout={"vertical"}
        renderItem={epic => (
          <List.Item>
            <List.Item.Meta
              title={
                <Row between={true}>
                  <span>{epic.name}</span>
                  <Button type={"link"} onClick={() => confirmDeleteEpic(epic)}>
                    Delete
                  </Button>
                </Row>
              }
              description={
                <div>
                  <div>Start time {dayjs(epic.start).format("YYYY-MM-DD")}</div>
                  <div>End time{dayjs(epic.end).format("YYYY-MM-DD")}</div>
                </div>
              }
            />
            <div>
              {tasks
                ?.filter(task => task.epicId === epic.id)
                .map(task => (
                  <Link
                    to={`/projects/${currentProject?.id}/dashboard?editingTaskId=${task.id}`}
                    key={task.id}
                  >
                    {task.name}
                  </Link>
                ))}
            </div>
          </List.Item>
        )}
      />
      <CreateEpic
        onClose={() => setEpicCreateOpen(false)}
        visible={epicCreateOpen}
      />
    </ScreenContainer>
  );
}
