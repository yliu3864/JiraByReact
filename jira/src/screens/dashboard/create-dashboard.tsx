import React, { useState } from "react";
import {
  useProjectIdInUrl,
  useDashboardQueryKey
} from "screens/dashboard/util";
import { useAddDashboard } from "utils/dashboard";
import { DoashboardContainer } from "screens/dashboard/index";
import { Input } from "antd";
import { Container } from "./dashboard-column";

export const CreateDashboard = () => {
  const [name, setName] = useState("");
  const projectId = useProjectIdInUrl();
  const { mutateAsync: addDashboard } = useAddDashboard(useDashboardQueryKey());
  const submit = async () => {
    await addDashboard({ name, projectId });
    setName("");
  };
  return (
    <Container>
      <Input
        size={"large"}
        placeholder={"create a new dashboard"}
        onPressEnter={submit}
        value={name}
        onChange={evt => setName(evt.target.value)}
      />
    </Container>
  );
};
