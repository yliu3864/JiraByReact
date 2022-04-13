import React from "react";
import { useDocumentTitle } from "utils";
import { useDashboards } from "utils/dashboard";
import {
  useProjectInUrl,
  useDashboardSearchParams
} from "screens/dashboard/util";
import { DashboardColumn } from "screens/dashboard/dashboard-column";
import styled from "@emotion/styled";

export default function DashboardScreen() {
  useDocumentTitle("Dashboard");
  const { data: dashboards } = useDashboards();
  const { data: currentProject } = useProjectInUrl();
  return (
    <div>
      <h1>{currentProject?.name} dashboard</h1>
      <DoashboardContainer>
        {dashboards?.map(dashboard => (
          <DashboardColumn dashboard={dashboard} key={dashboard.id} />
        ))}
      </DoashboardContainer>
    </div>
  );
}

const DoashboardContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`;
