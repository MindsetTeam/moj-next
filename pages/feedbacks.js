import styles from "@/styles/Feedback.module.css";
import { useState } from "react";

import { Form, Button, Input, Table, Upload, notification } from "antd";
import { useSession } from "next-auth/client";
import { fetcher } from "@/lib/fetch";
import { useFeedbacks } from "@/lib/feedback/hooks";

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};

const { TextArea } = Input;

const columns = [
  {
    title: "userName",
    dataIndex: "user",
    key: "user", 
    render(record) {
      return record.firstName + " " + record.lastName;
    },
  },
  {
    title: "description",
    dataIndex: "description",
    key: "description",
  },
  {
    title: "phoneNumber",
    dataIndex: "phoneNumber",
    key: "phoneNumber",
  },
  {
    title: "action",
    dataIndex: "action",
    key: "action",
    render: (text, record) => {
      return record.attachment ? (
        <a href={record.attachment} target={"_blank"}>
          View
        </a>
      ) : null;
    },
  },
];

const Feedback = () => {
  const [session] = useSession();
  const [form] = Form.useForm();
  const { data: feedbackList } = useFeedbacks();
  const onSubmitFeedback = () => {
    form.validateFields().then(async () => {
      const values = form.getFieldsValue();
      const formData = new FormData();
      if (values.attachment?.fileList?.length) {
        formData.append(
          "attachment",
          values.attachment?.fileList?.[0]?.originFileObj
        );
      }
      formData.append("phoneNumber", values.phoneNumber);
      formData.append("description", values.description);
      try {
        const res = await fetcher("/api/feedbacks", {
          method: "POST",
          body: formData,
        });
        notification.success({ message: res.msg });
        form.resetFields();
      } catch (error) {
        notification.error({ message: error });
      }
    });
  };

  return (
    <div className={styles.container}>
      {session?.user?.role !== "admin" ? (
        <div className={styles.feedbackForm}>
          <p className={styles.title}>Feedback Form</p>
          <div>
            <Form hideRequiredMark form={form} {...layout}>
              <Form.Item
                style={{ marginBottom: 20, width: 800 }}
                label="phoneNumber"
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="phoneNumber" />
              </Form.Item>
              <Form.Item
                style={{ marginBottom: 20, width: 800 }}
                label="description"
                name="description"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <TextArea rows={4} placeholder="description" />
              </Form.Item>
              <Form.Item label="attachment" name="attachment" maxCount={1}>
                <Upload>
                  <Button>Click to upload</Button>
                </Upload>
              </Form.Item>
              <Button
                htmlType="submit"
                onClick={onSubmitFeedback}
                className={styles.btnSubmit}
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      ) : (
        <>
          <p className={styles.title}>Feedback List</p>
          <div>
            <Table columns={columns} dataSource={feedbackList}></Table>
          </div>
        </>
      )}
    </div>
  );
};

export default Feedback;
