import React from "react";
import { Drawer, Button } from "antd";
import { useDispatch, useSelector } from "react-redux";
import {
  projectListActions,
  selectProjectModalOpen
} from "./project-list.slice";

export default function ProjectModal() {
  const dispatch = useDispatch();
  const projectModalOpen = useSelector(selectProjectModalOpen);
  return (
    <Drawer
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      visible={projectModalOpen}
      width={"100%"}
    >
      <h1>ProjectModal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>
        close
      </Button>
    </Drawer>
  );
}
