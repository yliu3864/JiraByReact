import React, { useEffect } from "react";
import { Drawer, Spin, Form, Input, Button } from "antd";
import { DrawerProps } from "antd/es/drawer";
import styled from "@emotion/styled";
import UserSelect from "components/user-select";
import { useAddEpic } from "utils/epic";
import { useEpicQueryKey } from "./util";
import { useForm } from "antd/es/form/Form";
import { useProjectIdInUrl } from "screens/dashboard/util";

export default function CreateEpic(
  props: Pick<DrawerProps, "visible"> & { onClose: () => void }
) {
  const { mutate: addEpic, isLoading, error } = useAddEpic(useEpicQueryKey());
  const [form] = useForm();
  const projectId = useProjectIdInUrl();
  const onFinish = async (values: any) => {
    await addEpic({ ...values, projectId });
    props.onClose();
  };

  useEffect(() => {
    form.resetFields();
  }, [form, props.visible]);
  return (
    <Drawer
      visible={props.visible}
      onClose={props.onClose}
      forceRender={true}
      destroyOnClose={true}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>Create epic</h1>
            {/* {error ? (
            <Typography.Text type={"danger"}>{error.message}</Typography.Text>
          ) : null} */}
            <Form
              form={form}
              layout={"vertical"}
              style={{ width: "40rem" }}
              onFinish={onFinish}
            >
              <Form.Item
                label={"Name"}
                name={"name"}
                rules={[{ required: true, message: "please input epic name" }]}
              >
                <Input placeholder={"please input epic name"} />
              </Form.Item>

              <Form.Item>
                <Button
                  loading={isLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  );
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
