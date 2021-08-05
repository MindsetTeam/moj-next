import { Form, Button, Input } from "antd";
import { signIn } from "next-auth/client";
import { useRouter } from "next/router";
import { AlertDispatch } from "contexts/alert.context";
import { useContext } from "react";
import Image from "next/image";
import Hello from "@/public/hello.png";
import Cookies from "js-cookie";
import { useSession } from "next-auth/client";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 16,
  },
};

const Login = () => {
  const [session] = useSession();
  const router = useRouter();
  const dispatch = useContext(AlertDispatch);

  let referer = router.query.referer;
  if (session && Cookies.get("authorization")) {
    router.push(`/`);
    return null;
  }
  const [form] = Form.useForm();
  const login = () => {
    const dataInput = form.getFieldsValue(true);
    form.validateFields().then(async () => {
      const result = await signIn("credentials", {
        redirect: false,
        username: dataInput.username.trim(),
        password: dataInput.password.trim(),
      });
      if (result.error) {
        dispatch({
          type: "ERROR",
          payload: {
            message: "Password not match",
            description: "Password should be the same as username (អត្តលេខ)",
          },
        });
      }
      if (!result.error) {
        router.replace(decodeURIComponent(referer || "") || "/");
        Cookies.set("authorization", "yep", { expires: 30 });
      }
    });
  };
  return (
    <div
      style={{
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        height: "78vh",
      }}
    >
      <div style={{ textAlign: "center" }}>
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
          style={{ marginBottom: 10, width: "300px" }}
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
          style={{ marginBottom: 10, width: "300px" }}
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

        <Button htmlType="submit" onClick={login}>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
