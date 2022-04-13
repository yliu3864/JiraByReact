import React, { useEffect } from "react";
import { Drawer, Button, Spin, Form, Input, Typography } from "antd";
import { useProjectModal, useProjectsQueryKey } from "./util";
import UserSelect from "components/user-select";
import { useEditProject, useAddProject } from "utils/project";
import { useForm } from "antd/es/form/Form";
import { ErrorBox } from "components/lib";
import styled from "@emotion/styled";

export default function ProjectModal() {
  const {
    projectModalOpen,
    close,
    editingProject,
    isLoading
  } = useProjectModal();

  const useMutateProject = editingProject ? useEditProject : useAddProject;
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(
    useProjectsQueryKey()
  );
  const [form] = useForm();
  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields();
      close();
    });
  };

  const closeModal = () => {
    form.resetFields();
    close();
  };

  const title = editingProject ? "Edit Project" : "Create Project";

  useEffect(() => {
    form.setFieldsValue(editingProject);
  }, [editingProject, form]);

  return (
    <Drawer
      forceRender={true}
      onClose={closeModal}
      visible={projectModalOpen}
      width={"100%"}
    >
      <Container>
        {isLoading ? (
          <Spin size={"large"} />
        ) : (
          <>
            <h1>{title}</h1>
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
                rules={[
                  { required: true, message: "please input project name" }
                ]}
              >
                <Input placeholder={"please input project name"} />
              </Form.Item>
              <Form.Item
                label={"Department"}
                name={"organization"}
                rules={[
                  { required: true, message: "please input department name" }
                ]}
              >
                <Input placeholder={"please input department name"} />
              </Form.Item>
              <Form.Item label={"Owner"} name={"personId"}>
                <UserSelect defaultOptionName={"Owner"} />
              </Form.Item>
              <Form.Item>
                <Button
                  loading={mutateLoading}
                  type={"primary"}
                  htmlType={"submit"}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
        <h1>ProjectModal</h1>
        <Button onClick={closeModal}>close</Button>
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
