import { Form, Button, Col, Row, Input } from "antd";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { AlertDispatch } from "contexts/alert.context";
import { useContext } from "react";


const Login = () => {
  const router = useRouter()
  const dispatch = useContext(AlertDispatch);

  let referer = router.query.referer;

  const [form] = Form.useForm();
  const login = () => {
   const dataInput = form.getFieldsValue(true);
   form.validateFields().then(async() => {
      const result = await signIn("credentials", {
        redirect: false,
        username: dataInput.username.trim(),
        password: dataInput.password.trim(),
      });
      if(result.error){
        alert(result.error)
      //   dispatch({
      //     type: "ERROR",
      //     payload: {
      //        message: "Password not match",
      //        description: "Password should be the same as username (អត្តលេខ)",
      //     },  
      //  });
      }
      if(!result.error){
        router.replace(decodeURIComponent(referer||"")||'/')
      }
    });
  };
  return (
    <div>
      <Form layout="vertical" hideRequiredMark form={form}>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              style={{ marginBottom: 10, width:'300px' }}
              label="អត្តលេខ"
              name="username"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="username" />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={6}>
            <Form.Item
              style={{ marginBottom: 10,width:'300px' }}
              label="Password"
              name="password"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input placeholder="password" />
            </Form.Item>
          </Col>
        </Row>
        <Button style={{ marginRight: 8 }} onClick={login}>Login</Button>
      </Form>
    </div>
  );
};


export default Login;
