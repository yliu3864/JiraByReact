import React from "react";
import { User } from "./search-panel";
import { Table } from "antd";
import dayjs from "dayjs";

interface Project {
  id: string;
  name: string;
  personId: string;
  pin: boolean;
  organization: string;
  created: number;
}

interface ListProps {
  list: Project[];
  users: User[];
}

export default function List({ list, users }: ListProps) {
  return (
    <Table
      pagination={false}
      columns={[
        {
          title: "Name",
          dataIndex: "name",
          sorter: (a, b) => a.name.localeCompare(b.name)
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
      dataSource={list}
      rowKey={users => users.id}
    />
  );
}
