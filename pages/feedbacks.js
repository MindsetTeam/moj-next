import styles from "@/styles/Feedback.module.css";
import { useState } from "react";

import { Form, Button, Input, Table } from "antd";
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
    title: "phone",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "feedback",
    dataIndex: "feedback",
    key: "feedback",
  },
];

const Feedback = () => {
  const [session] = useSession();
  const [form] = Form.useForm();
  const [feedbackList, setfeedBackList] = useState([]);
  const onSubmitFeedback = () => {
     
  }

  return (
    <div className={styles.container}>
      {session?.user.role != "admin" ? (
        <div className={styles.feedbackForm}>
          <p className={styles.title}>Feedback Form</p>
          <div>
            <Form hideRequiredMark form={form} {...layout}>
              <Form.Item
                style={{ marginBottom: 20, width: 800 }}
                label="phone"
                name="phone"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="phone" />
              </Form.Item>

              <Form.Item
                style={{ marginBottom: 20, width: 800 }}
                label="feedback"
                name="feedback"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <TextArea rows={4} placeholder="feedback" />
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
