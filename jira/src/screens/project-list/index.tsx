import React, { useState, useEffect } from "react";
import SearchPanel from "./search-panel";
import List, { Project } from "./list";
import cleanObject, { useMount, useDebounce, useDocumentTitle } from "utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { Typography, Button } from "antd";
import { useUrlQueryParam } from "utils/url";
import { useProjectSearchParams } from "./util";
import { Row } from "components/lib";

const apiUrl = process.env.REACT_APP_API_URL;
export default function ProjectListScreen(props: {
  projectButton: JSX.Element;
}) {
  // const [list, setList] = useState([]);
  // const [users, setUsers] = useState([]);
  const [param, setParam] = useProjectSearchParams();
  // const { run, isLoading, error, data: list } = useAsync<Project[]>();
  const { isLoading, error, data: list, retry } = useProjects(
    useDebounce(param, 200)
  );
  const { data: users } = useUser();

  // useEffect(() => {
  //   run(client("projects", { data: cleanObject(debouncedParam) }));
  // }, [debouncedParam]);

  // useMount(() => {
  //   client("users").then(setUsers);
  // });
  return (
    <div>
      <Row between={true}>
        <h1>Project List</h1>
        {/* <Button onClick={() => props.setProjectModalOpen(true)}>
          Create new project
        </Button> */}
        {props.projectButton}
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List
        // setProjectModalOpen={props.setProjectModalOpen}
        projectButton={props.projectButton}
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </div>
  );
}

const Container = styled.div``;
