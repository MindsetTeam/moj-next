import { fetcher } from "@/lib/fetch";
import styles from "@/styles/Personal.module.css";

import { Form, Button, Input, notification, Tabs } from "antd";
import { useCallback, useState } from "react";
const { TabPane } = Tabs;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 10,
  },
};

const Personal = () => {
  const [form] = Form.useForm();
  const [formInfo] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = useCallback(() => {
    form.validateFields().then(async () => {
      const { oldPassword, newPassword } = form.getFieldsValue();
      try {
        setIsLoading(true);
        const res = await fetcher("/api/auth/updatepassword", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            oldPassword,
            newPassword,
          }),
        });
        notification.success({
          message: res.msg,
        });
      } catch (err) {
        return notification.error({
          message: err,
        });
      } finally {
        setIsLoading(false);
        form.resetFields();
      }
    });
  }, []);
  const onSubmitInfo = useCallback(() => {
    formInfo.validateFields().then(async () => {
      const { phoneNumber, email } = formInfo.getFieldsValue();
      try {
        setIsLoading(true);
        const res = await fetcher("/api/auth/info", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            phoneNumber1:phoneNumber,
            email,
          }),
        });
        notification.success({
          message: res.msg,
        });
      } catch (err) {
        return notification.error({
          message: err,
        });
      } finally {
        setIsLoading(false);
        formInfo.resetFields();
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <Tabs defaultActiveKey="1" centered>
        <TabPane tab="កំណត់ពាក្យសម្ងាត់ឡើងវិញ" key="1">
          <Form form={form} {...layout}>
            {" "}
            <Form.Item
              style={{ marginBottom: 20, width: 800 }}
              label="លេខសំងាត់​បច្ចុប្បន្ន"
              name="oldPassword"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password placeholder="current password" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 20, width: 800 }}
              label="ពាក្យសម្ងាត់​ថ្មី"
              name="newPassword"
              hasFeedback
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input.Password placeholder="password" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 20, width: 800 }}
              label="បញ្ជាក់​លេខសំងាត់​ថ្មី"
              name="confirmPassword"
              hasFeedback
              dependencies={["newPassword"]}
              rules={[
                {
                  required: true,
                },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("newPassword") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("The two passwords you entered do not matched")
                    );
                  },
                }),
              ]}
            >
              <Input.Password placeholder="Confirm password" />
            </Form.Item>
            <Button
              htmlType="submit"
              onClick={onSubmit}
              loading={isLoading}
              className={styles.btnResetPassword}
            >
              រក្សាទុក
            </Button>
          </Form>
        </TabPane>
        <TabPane tab="កែសម្រួលព័ត៌មានរបស់អ្នក" key="2">
          <Form form={formInfo} {...layout}>
            <Form.Item
              style={{ marginBottom: 20, width: 800 }}
              label="លេខទូរស័ព្ទ"
              name="phoneNumber"
            
            >
              <Input placeholder="លេខទូរស័ព្ទថ្មី" />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: 20, width: 800 }}
              label="អ៊ីមែល"
              name="email"
              hasFeedback
            
            >
              <Input placeholder="អ៊ីមែលថ្មី" />
            </Form.Item>
            <Button
              htmlType="submit"
              onClick={onSubmitInfo}
              loading={isLoading}
              className={styles.btnResetPassword}
            >
              រក្សាទុក
            </Button>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default Personal;
