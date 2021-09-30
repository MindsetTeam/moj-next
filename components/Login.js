import styles from "@/styles/Login.module.css";
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
                  description:
                     "Password should be the same as username (អត្តលេខ)",
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
      <div className={styles.container}>
         <div className={styles.loginContainer}>
            <div className={styles.leftSection}>
               <Image
                  src={Hello}
                  alt="Typer"
                  placeholder="blur"
                  width={120}
                  height={120}
               />
               <p>Blah Blah Blah</p>
            </div>
            <div className={styles.rightSection}>
               <h1>Login</h1>
               <Form hideRequiredMark form={form} {...layout}>
                  <Form.Item
                     style={{ marginBottom: 20 }}
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
                     style={{ marginBottom: 10 }}
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

                  <Button
                     htmlType="submit"
                     onClick={login}
                     className={styles.btnLogin}
                     shape="round"
                  >
                     Login
                  </Button>
               </Form>
            </div>
         </div>
      </div>
   );
};

export default Login;
