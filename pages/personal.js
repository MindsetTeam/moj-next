import styles from "@/styles/Personal.module.css";

import { Form, Button, Input } from "antd";

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
   return (
      <div className={styles.container}>
         <p>Reset Account Password</p>
         <div>
            <Form hideRequiredMark form={form} {...layout}>
               <Form.Item
                  style={{ marginBottom: 20, width: 800 }}
                  label="Password"
                  name="password"
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
                  rules={[
                     {
                        required: true,
                     },
                  ]}
               >
                  <Input.Password placeholder="Confirm password" />
               </Form.Item>

               <Button
                  htmlType="submit"
                  //  onClick={login}
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
