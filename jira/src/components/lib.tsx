import styled from "@emotion/styled";
import { Spin, Typography, Button } from "antd";
import React from "react";

export const Row = styled.div<{
  gap?: number | boolean;
  between?: boolean;
  marginBottom?: number;
}>`
  display: flex;
  align-items: center;
  justify-content: ${props => (props.between ? "space-between" : undefined)};
  margin-bottom: ${props =>
    props.marginBottom ? "marginBottom" + "rem" : undefined};
  > * {
    margin-top: 0 !important;
    margin-bottom: 0 !important;
    margin-right: ${props =>
      typeof props.gap === "number"
        ? props.gap + "rem"
        : props.gap
        ? "2rem"
        : undefined};
  }
`;

const FullPage = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const FullPageLoading = () => (
  <FullPage>
    <Spin size={"large"}></Spin>
  </FullPage>
);

export const FullPageErrorFallback = ({ error }: { error: Error | null }) => (
  <FullPage>
    {/* <ErrorBox error={error} /> */}
    <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
  </FullPage>
);

export const ButtonNoPadding = styled(Button)`
  padding: 0;
`;

const isError = (value: any): value is Error => value?.message;

export const ErrorBox = ({ error }: { error?: { message: string } }) => {
  if (isError(error)) {
    return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>;
  }
  return null;
};

export const ScreenContainer = styled.div`
  padding: 3.2 rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
