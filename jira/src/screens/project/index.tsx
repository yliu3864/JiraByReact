import React from "react";
import { Link } from "react-router-dom";
import { Routes, Route, Navigate, useLocation } from "react-router";
import DashboardScreen from "screens/dashboard";
import EpicScreen from "screens/epic";
import { ScreenContainer } from "components/lib";
import styled from "@emotion/styled";
import { Menu } from "antd";

const useRouteType = () => {
  const units = useLocation().pathname.split("/");
  return units[units.length - 1];
};

export default function ProjectScreen() {
  const routeType = useRouteType();
  return (
    <Container>
      <Aside>
        <Menu mode={"inline"} selectedKeys={[routeType]}>
          <Menu.Item key={"dashboard"}>
            <Link to={"dashboard"}>DashBoard</Link>
          </Menu.Item>
          <Menu.Item key={"epic"}>
            <Link to={"epic"}>Epic</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path={"/dashboard"} element={<DashboardScreen />} />
          <Route path={"/epic"} element={<EpicScreen />} />
        </Routes>
      </Main>
      {/* <Navigate to={window.location.pathname + "/dashboard"} /> */}
    </Container>
  );
}

const Aside = styled.aside`
  background-color: rgb(244, 245, 247);
  display: flex;
`;

const Main = styled.div`
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  padding-left: 20px;
  display: flex;
  overflow: hidden;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 16rem 1fr;
  overflow: hidden;
`;
