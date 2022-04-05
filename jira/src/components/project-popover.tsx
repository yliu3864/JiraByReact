import React from "react";
import { Popover, Typography, List, Divider, Button } from "antd";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";

export default function ProjectPopover(props: { projectButton: JSX.Element }) {
  const { data: projects, isLoading } = useProjects();
  const pinnedProjects = projects?.filter(project => project.pin);

  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>Collected</Typography.Text>
      <List>
        {pinnedProjects?.map(project => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      {/* <ButtonNoPadding
        onClick={() => props.setProjectModalOpen(true)}
        type={"link"}
      >
        Create new project
      </ButtonNoPadding> */}
      {props.projectButton}
    </ContentContainer>
  );
  return (
    <Popover placement={"bottom"} content={content}>
      <span>project</span>
    </Popover>
  );
}

const ContentContainer = styled.div`
  min-width: 30rem;
`;
