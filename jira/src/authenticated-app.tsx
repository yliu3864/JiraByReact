import React from "react";
import ProjectListScreen from "screens/project-list";
import { useAuth } from "context/auth-context";
import styled from "@emotion/styled";

export default function AuthenticatedApp() {
  const { logout } = useAuth();
  return (
    <Container>
      <Header>
        <HeaderLeft>
          <h3>Logo</h3>
          <h3>Project</h3>
          <h3>User</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>Sign Out</button>
        </HeaderRight>
      </Header>
      {/* <Nav>nav</Nav> */}
      <Main>
        <ProjectListScreen />
      </Main>
      {/* <Aside>aside</Aside> */}
      {/* <Footer>footer</Footer> */}
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

// const Container = styled.div`
//   display: grid;
//   grid-template-rows: 6rem 1fr 6rem;
//   height: 100vh;
// `;

const Header = styled.header`
  grid-area: header;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
`;
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
