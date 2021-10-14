import { fetcher } from "@/lib/fetch";
import styles from "@/styles/Personal.module.css";

import { Form, Button, Input, notification } from "antd";
import { useCallback, useState } from "react";

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
         console.log(err);
        return notification.error({
          message: err.message,
        });
      } finally {
        setIsLoading(false);
        form.resetFields();
      }
    });
  }, []);

  return (
    <div className={styles.container}>
      <p>Reset Account Password</p>
      <div>
        <Form hideRequiredMark form={form} {...layout}>
          <Form.Item
            style={{ marginBottom: 20, width: 800 }}
            label="Current Password"
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
            label="Password"
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
            label="Confirm Password"
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
            Reset Password
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default Personal;
