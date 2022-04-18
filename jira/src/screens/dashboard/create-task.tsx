import React, { useState, useEffect } from "react";
import {
  useProjectIdInUrl,
  useDashboardQueryKey,
  useTasksQueryKey
} from "screens/dashboard/util";
import { useAddTask } from "utils/task";
import { Input, Card } from "antd";
import { Container } from "./dashboard-column";

export const CreateTask = ({ dashboardId }: { dashboardId: number }) => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey());
  const [inputMode, setInputMode] = useState(false);

  const submit = async () => {
    await addTask({ projectId, name, dashboardId });
    setInputMode(false);
    setName("");
  };

  const toggle = () => setInputMode(mode => !mode);
  useEffect(() => {
    if (!inputMode) {
      setName("");
    }
  }, [inputMode]);

  if (!inputMode) {
    return <div onClick={toggle}>+create a task</div>;
  }

  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder={"need to do"}
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={evt => setName(evt.target.value)}
      />
    </Card>
  );
};
