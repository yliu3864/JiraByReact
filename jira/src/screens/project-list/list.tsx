import React from "react";
import { User } from "./search-panel";
import { Table } from "antd";
import dayjs from "dayjs";
import { TableProps } from "antd/lib/table";
import { Link } from "react-router-dom";
import Pin from "components/pin";
import { useEditProject } from "utils/project";

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
  refresh?: () => void;
}

type PropType = Omit<ListProps, "users">;

export default function List({ users, ...props }: ListProps) {
  const { mutate } = useEditProject();
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
              <Pin
                checked={project.pin}
                onCheckedChange={pin => {
                  mutate({ id: project.id, pin }).then(props.refresh);
                }}
              />
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
        }
      ]}
      {...props}
    />
  );
}
