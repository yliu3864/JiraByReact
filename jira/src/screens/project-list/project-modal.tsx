import React from "react";
import { Drawer, Button } from "antd";
import { useProjectModal } from "./util";

export default function ProjectModal() {
  const { projectModalOpen, close } = useProjectModal();
  return (
    <Drawer onClose={close} visible={projectModalOpen} width={"100%"}>
      <h1>ProjectModal</h1>
      <Button onClick={close}>close</Button>
    </Drawer>
  );
}
