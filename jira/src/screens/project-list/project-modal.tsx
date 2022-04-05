import React from "react";
import { Drawer, Button } from "antd";

export default function ProjectModal(props: {
  projectModalOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Drawer
      onClose={props.onClose}
      visible={props.projectModalOpen}
      width={"100%"}
    >
      <h1>ProjectModal</h1>
      <Button onClick={props.onClose}>close</Button>
    </Drawer>
  );
}
