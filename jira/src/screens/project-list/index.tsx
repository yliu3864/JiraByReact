import React, { useState, useEffect } from "react";
import SearchPanel from "./search-panel";
import List from "./list";
import cleanObject, { useMount, useDebounce } from "utils";
import * as qs from "qs";
import { useHttp } from "utils/http";
import styled from "@emotion/styled";

const apiUrl = process.env.REACT_APP_API_URL;
export default function ProjectListScreen() {
  const [param, setParam] = useState({
    name: "",
    personId: ""
  });
  const [list, setList] = useState([]);
  const [users, setUsers] = useState([]);
  const debouncedParam = useDebounce(param, 200);
  const client = useHttp();

  useEffect(() => {
    client("projects", { data: cleanObject(debouncedParam) }).then(setList);
    // fetch(
    //   `${apiUrl}/projects?${qs.stringify(cleanObject(debouncedParam))}`
    // ).then(async response => {
    //   if (response.ok) {
    //     setList(await response.json());
    //   }
    // });
  }, [debouncedParam]);

  useMount(() => {
    client("users").then(setUsers);
    // fetch(`${apiUrl}/users`).then(async response => {
    //   if (response.ok) {
    //     setUsers(await response.json());
    //   }
    // });
  });
  return (
    <div>
      <h1>Project List</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  );
}

const Container = styled.div``;
