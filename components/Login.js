import { Form, Button, Col, Row, Input, Alert } from "antd";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { AlertDispatch } from "contexts/alert.context";
import { useContext } from "react";
import Image from 'next/image';
import Hello from "@/public/hello.png";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

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
      <div style={{textAlign:"center"}}>
        <Image
          src={Hello}
          alt="Typer"
          placeholder="blur"
          width={200}
          height={200}
        />
      </div>
      <Form hideRequiredMark form={form} {...layout}>
      
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
              <Input placeholder="អត្តលេខ" />
            </Form.Item>
       
       
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
       
        <Button onClick={login} >Login</Button>
      </Form>
    </div>
  );
};


export default Login;
