import React from "react";
import { useTasksSearchParams } from "screens/dashboard/util";
import { useSetUrlSearchParam } from "utils/url";
import { Row } from "components/lib";
import { Input, Button } from "antd";
import UserSelect from "components/user-select";
import TaskTypeSelect from "../../components/task-type-select";

export default function SearchPanel() {
  const searchParams = useTasksSearchParams();
  const setSearchParams = useSetUrlSearchParam();
  const reset = () => {
    setSearchParams({
      typeId: undefined,
      processorId: undefined,
      tagId: undefined,
      name: undefined
    });
  };

  return (
    <Row marginBottom={4} gap={true}>
      <Input
        style={{ width: "20rem" }}
        placeholder={"name"}
        value={searchParams.name}
        onChange={evt => setSearchParams({ name: evt.target.value })}
      />
      <UserSelect
        defaultOptionName={"Assignee"}
        value={searchParams.processorId}
        onChange={value => setSearchParams({ processorId: value })}
      />
      <TaskTypeSelect
        defaultOptionName={"Type"}
        value={searchParams.typeId}
        onChange={value => setSearchParams({ typeId: value })}
      />
      <Button onClick={reset}>Clear all</Button>
    </Row>
  );
}
