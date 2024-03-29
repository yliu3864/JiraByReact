import React, { useState, useEffect } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import cleanObject, { useMount, useDebounce, useDocumentTitle } from "utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
import { useAsync } from "utils/use-async";
import styled from "@emotion/styled";
import { useProjects } from "utils/project";
import { useUser } from "utils/user";
import { Typography, Button } from "antd";
import { useUrlQueryParam } from "utils/url";
import { useProjectSearchParams, useProjectModal } from "./util";
import { Row } from "components/lib";

const apiUrl = process.env.REACT_APP_API_URL;
export default function ProjectListScreen() {
  // const [list, setList] = useState([]);
  // const [users, setUsers] = useState([]);
  const [param, setParam] = useProjectSearchParams();
  // const { run, isLoading, error, data: list } = useAsync<Project[]>();
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200));
  const { data: users } = useUser();

  const { open } = useProjectModal();

  // useEffect(() => {
  //   run(client("projects", { data: cleanObject(debouncedParam) }));
  // }, [debouncedParam]);

  // useMount(() => {
  //   client("users").then(setUsers);
  // });
  return (
    <Container>
      <Row between={true}>
        <h1>Project List</h1>
        <Button onClick={open}>Create new project</Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={"danger"}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users || []} dataSource={list || []} />
    </Container>
  );
}

const Container = styled.div``;
