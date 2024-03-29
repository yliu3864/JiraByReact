import React, { useState } from "react";
import ProjectListScreen from "screens/project-list";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";
import { Row, ButtonNoPadding } from "components/lib";
import softwareLogo from "assets/Jira-Software.svg";
import { Dropdown, Menu, Button } from "antd";
import { Navigate, Route, Routes } from "react-router";
import { BrowserRouter as Router } from "react-router-dom";
import ProjectScreen from "screens/project";
import { resetRoute } from "utils";
import ProjectModal from "screens/project-list/project-modal";
import ProjectPopover from "components/project-popover";

export default function AuthenticatedApp() {
  // const [projectModalOpen, setProjectModalOpen] = useState(false);
  return (
    <Container>
      <Router>
        <PageHeader

        // setProjectModalOpen={setProjectModalOpen}
        />
        {/* <Nav>nav</Nav> */}
        <Main>
          {/* <ProjectListScreen /> */}

          <Routes>
            <Route path="/" element={<Navigate to="/projects" replace />} />
            <Route path={"/projects"} element={<ProjectListScreen />}></Route>
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            ></Route>
          </Routes>
        </Main>
        {/* <Aside>aside</Aside> */}
        {/* <Footer>footer</Footer> */}
        <ProjectModal />
      </Router>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 0 1fr 0;
  grid-template-areas:
    "header header header"
    "nav main aside"
    "footer footer footer";
  height: 100vh;
`;

const PageHeader = () => {
  const { logout, user } = useAuth();
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <img src={softwareLogo} onClick={resetRoute} />
        <ProjectPopover />
        <span>User</span>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key={"logout"}>
                <a onClick={logout}>Sign Out</a>
              </Menu.Item>
            </Menu>
          }
        >
          <a onClick={e => e.preventDefault()}>Hi,{user?.name}</a>
        </Dropdown>
      </HeaderRight>
    </Header>
  );
};

const Header = styled(Row)`
  grid-area: header;
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`;
const HeaderLeft = styled(Row)``;
const HeaderRight = styled.div``;
const Main = styled.main`
  grid-area: main;
  display: flex;
  overflow: hidden;
`;
const Nav = styled.nav`
  grid-area: nav;
`;
const Aside = styled.aside`
  grid-area: aside;
`;
const Footer = styled.footer`
  grid-area: footer;
`;
