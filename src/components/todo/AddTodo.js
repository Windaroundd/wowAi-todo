import React, { useState } from "react";
import { useRecoilState } from "recoil";

import { Modal, Button, Checkbox, Form, Input, DatePicker } from "antd";

import { todoListAtom } from "../../pages/Home/recoil";
import { TODO } from "../../contanst";
import { localServices } from "../../services/localServices";
import moment from "moment";

const AddTodo = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [todoList, setTodoList] = useRecoilState(todoListAtom);
  const [date, setDate] = useState();

  const [form] = Form.useForm();

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const onChange = (date, dateString) => {
    setDate(date);
  };
  const onFinish = (values) => {
    let newTodo = [...todoList];
    let finalData = [
      ...newTodo,
      {
        ...values,
        id: Date.now(),
        status: TODO,
        deadline: date ?? null,
      },
    ];
    localServices.set(finalData);
    setTodoList(finalData);
    form.resetFields();
    setIsModalOpen(false);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className="relative flex justify-center">
      <button
        onClick={showModal}
        className="h-10 cursor-pointer rounded-md bg-[rgba(222,57,99,0.6)] px-5"
      >
        Add new Task
      </button>
      <Modal
        title="Add new task"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
          name="basic"
          labelCol={{
            span: 8,
          }}
          wrapperCol={{
            span: 16,
          }}
          style={{
            maxWidth: 600,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Title"
            name="title"
            rules={[
              {
                required: true,
                message: "Please input todo title!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Description" name="desc">
            <Input />
          </Form.Item>
          <Form.Item label="Task deadline" name="deadline">
            <DatePicker
              disabledDate={(current) => {
                return (
                  moment().add(-1, "days") >= current ||
                  moment().add(1, "month") <= current
                );
              }}
              onChange={onChange}
            />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <button
              className="h-10 cursor-pointer rounded-md bg-[rgba(222,57,99,0.6)] px-5"
              type="submit"
            >
              Submit
            </button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default AddTodo;
