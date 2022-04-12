import React from "react";
import { User } from "./search-panel";
import { Table, Rate, Dropdown, Menu, Modal } from "antd";
import dayjs from "dayjs";
import { TableProps } from "antd/lib/table";
import { Link } from "react-router-dom";
import Pin from "components/pin";
import { useEditProject, useDeleteProject } from "utils/project";
import { ButtonNoPadding } from "components/lib";
import { useProjectModal, useProjectsQueryKey } from "./util";

export interface Project {
  id: string;
  name: string;
  personId: number;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps extends TableProps<Project> {
  // list: Project[];
  users: User[];
  // setProjectModalOpen: (isOpen: boolean) => void;
  // projectButton: JSX.Element;
}

type PropType = Omit<ListProps, "users">;

export default function List({ users, ...props }: ListProps) {
  const { mutate } = useEditProject(useProjectsQueryKey());
  // const pinProject = (id:number) =>(pin:boolean)=>mutate({id,pin})

  return (
    <Table
      rowKey={"id"}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              // <Pin
              //   checked={project.pin}
              //   onCheckedChange={pin => {
              //     mutate({ id: project.id, pin }).then(props.refresh);
              //   }}
              // />
              <Rate count={1} />
            );
          }
        },
        {
          title: "Name",
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={String(project.id)}>{project.name}</Link>;
          }
        },
        {
          title: "Department",
          dataIndex: "organization"
        },
        {
          title: "Supervisor",
          render(value, project) {
            return (
              <span>
                {users.find(user => user.id === project.personId)?.name ||
                  "Unknown"}
              </span>
            );
          }
        },
        {
          title: "Created Time",
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format("YYYY-MM-DD")
                  : "none"}
              </span>
            );
          }
        },
        {
          render(value, project) {
            return <More project={project} />;
          }
        }
      ]}
      {...props}
    />
  );
}

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal();
  const editProject = (id: number) => () => startEdit(id);
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey());
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: "Delete this project?",
      content: "Click to delete",
      okText: "Yes",
      onOk() {
        deleteProject(id);
      }
    });
  };
  return (
    <Dropdown
      overlay={
        <Menu>
          <Menu.Item key={"edit"} onClick={editProject(Number(project.id))}>
            {/* <ButtonNoPadding
                        type={"link"}
                        onClick={() => props.setProjectModalOpen(true)}
                      >
                        Edit
                      </ButtonNoPadding> */}
            Edit
          </Menu.Item>
          <Menu.Item
            onClick={() => confirmDeleteProject(Number(project.id))}
            key={"delete"}
          >
            Delete
          </Menu.Item>
        </Menu>
      }
    >
      <ButtonNoPadding type={"link"}>...</ButtonNoPadding>
    </Dropdown>
  );
};
