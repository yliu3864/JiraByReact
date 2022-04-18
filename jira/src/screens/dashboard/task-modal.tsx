import React, { useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import { useTasksModal, useTasksQueryKey } from "./util";
import { useEditTask, useDeleteTask } from "utils/task";
import { Modal, Form, Input, Button } from "antd";
import UserSelect from "components/user-select";
import TaskTypeSelect from "components/task-type-select";

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { span: 16 }
};

export default function TaskModal() {
  const [form] = useForm();
  const { editingTaskId, editingTask, close } = useTasksModal();
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(
    useTasksQueryKey()
  );
  const { mutate: deleteTask } = useDeleteTask(useTasksQueryKey());
  const onCancel = () => {
    close();
    form.resetFields();
  };
  const onOk = async () => {
    await editTask({ ...editingTask, ...form.getFieldsValue() });
    close();
  };

  const startDelete = () => {
    close();
    Modal.confirm({
      okText: "Yes",
      cancelText: "No",
      title: "Confirm",
      onOk() {
        return deleteTask(Number(editingTaskId));
      }
    });
  };

  useEffect(() => {
    form.setFieldsValue(editingTask);
  }, [form, editingTask]);
  return (
    <Modal
      forceRender={true}
      onCancel={onCancel}
      onOk={onOk}
      okText={"Confirm"}
      cancelText={"cancel"}
      confirmLoading={editLoading}
      title={"edit task"}
      visible={!!editingTaskId}
    >
      <Form {...layout} initialValues={editingTask} form={form}>
        <Form.Item
          label={"Task Name"}
          name={"name"}
          rules={[{ required: true, message: "please input name" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label={"Person Name"} name={"processorId"}>
          <UserSelect defaultOptionName={"Owner"} />
        </Form.Item>

        <Form.Item label={"Type"} name={"typeId"}>
          <TaskTypeSelect />
        </Form.Item>
      </Form>

      <div style={{ textAlign: "right" }}>
        <Button
          onClick={startDelete}
          size={"small"}
          style={{ fontSize: "14px" }}
        >
          delete
        </Button>
      </div>
    </Modal>
  );
}
