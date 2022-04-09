import React from "react";
import { Popover, Typography, List, Divider, Button } from "antd";
import { useProjects } from "utils/project";
import styled from "@emotion/styled";
import { ButtonNoPadding } from "./lib";
import { useProjectModal } from "screens/project-list/util";

export default function ProjectPopover() {
  const { data: projects, isLoading } = useProjects();
  const pinnedProjects = projects?.filter(project => project.pin);
  const {open} = useProjectModal();
  const content = (
    <ContentContainer>
      <Typography.Text type={"secondary"}>Collected</Typography.Text>
      <List>
        {pinnedProjects?.map(project => (
          <List.Item key={project.id}>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      <ButtonNoPadding onClick={open} type={"link"}>
        Create new project
      </ButtonNoPadding>
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
