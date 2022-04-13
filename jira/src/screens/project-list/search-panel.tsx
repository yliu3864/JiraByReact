import React from "react";
import { Input, Select, Form } from "antd";
import UserSelect from "components/user-select";
import { Project } from "types/project";
import { User } from "../../types/user";

interface SearchPanelProps {
  users: User[];
  param: Partial<Pick<Project, "name" | "personId">>;
  setParam: (param: SearchPanelProps["param"]) => void;
}
export default function SearchPanel({
  users,
  param,
  setParam
}: SearchPanelProps) {
  return (
    <Form style={{ marginBottom: "2rem" }} layout={"inline"}>
      <Form.Item>
        <Input
          placeholder={"project name"}
          type="text"
          value={param.name}
          onChange={evt =>
            setParam({
              ...param,
              name: evt.target.value
            })
          }
        />
      </Form.Item>
      <Form.Item>
        <UserSelect
          defaultOptionName={"Owner"}
          value={param.personId}
          onChange={value =>
            setParam({
              ...param,
              personId: value
            })
          }
        />

        {/* <Select
          value={param.personId}
          onChange={value =>
            setParam({
              ...param,
              personId: value
            })
          }
        >
          <Select.Option value="">Owner</Select.Option>
          {users.map(user => (
            <Select.Option value={String(user.id)} key={user.id}>
              {user.name}
            </Select.Option>
          ))}
        </Select> */}
      </Form.Item>
    </Form>
  );
}
