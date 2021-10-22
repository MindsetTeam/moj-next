import styles from "@/styles/Feedback.module.css";
import { useState } from "react";

import { Form, Button, Input, Table, Upload } from "antd";
import { useSession } from "node_modules/next-auth/client";

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
    dataIndex: "userName",
    key: "userName",
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
  },
];

const Feedback = () => {
  const [session] = useSession();
  const [form] = Form.useForm();
  const [feedbackList, setfeedBackList] = useState([]);
  const onSubmitFeedback = () => {};

  return (
    <div className={styles.container}>
      {session?.user.role !== "admin" ? (
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
              <Form.Item label="attachment"
                name="attachment" maxCount={1}>
                <Upload>
                  <Button>Click to upload</Button>
                </Upload>
              </Form.Item>
              <Button
                htmlType="submit"
                //  onClick={login}
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
