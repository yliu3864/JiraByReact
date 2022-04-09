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
import { useDispatch } from "react-redux";

export default function AuthenticatedApp() {
  // const [projectModalOpen, setProjectModalOpen] = useState(false);
  const dispatch = useDispatch();
  return (
    <Container>
      <PageHeader
      // projectButton={

      // <ButtonNoPadding
      //   onClick={() => setProjectModalOpen(true)}
      //   type={"link"}
      // >
      //   Create new project
      // </ButtonNoPadding>

      // }
      // setProjectModalOpen={setProjectModalOpen}
      />
      {/* <Nav>nav</Nav> */}
      <Main>
        {/* <ProjectListScreen /> */}
        <Router>
          <Routes>
            <Route path="/" element={<Navigate to="/projects" replace />} />
            <Route
              path={"/projects"}
              element={
                <ProjectListScreen
                // projectButton={
                //   <ButtonNoPadding
                //     onClick={() => setProjectModalOpen(true)}
                //     type={"link"}
                //   >
                //     Create new project
                //   </ButtonNoPadding>
                // }
                />
              }
            ></Route>
            <Route
              path={"/projects/:projectId/*"}
              element={<ProjectScreen />}
            ></Route>
          </Routes>
        </Router>
      </Main>
      {/* <Aside>aside</Aside> */}
      {/* <Footer>footer</Footer> */}
      <ProjectModal
      // projectModalOpen={projectModalOpen}
      // onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
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
