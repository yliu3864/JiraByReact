import React from "react";
import { useDocumentTitle } from "utils";
import { useDashboards } from "utils/dashboard";
import {
  useProjectInUrl,
  useDashboardSearchParams
} from "screens/dashboard/util";
import { DashboardColumn } from "screens/dashboard/dashboard-column";
import styled from "@emotion/styled";
import SearchPanel from "screens/dashboard/search-panel";
import { ScreenContainer } from "components/lib";

export default function DashboardScreen() {
  useDocumentTitle("Dashboard");
  const { data: dashboards } = useDashboards(useDashboardSearchParams());
  const { data: currentProject } = useProjectInUrl();

  return (
    <ScreenContainer>
      <h1>{currentProject?.name} dashboard</h1>
      <SearchPanel />
      <DoashboardContainer>
        {dashboards?.map(dashboard => (
          <DashboardColumn dashboard={dashboard} key={dashboard.id} />
        ))}
      </DoashboardContainer>
    </ScreenContainer>
  );
}

const DoashboardContainer = styled.div`
  display: flex;
  overflow-x: scoll;
  flex: 1;
`;
