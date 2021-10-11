import { Form, Button, Col, Row, Input, Select } from "antd";

const { Option } = Select;

const Add = () => {
  const [form] = Form.useForm();

   const saveEmployee = async () => {
      const dataInput = form.getFieldsValue(true);
      console.log(dataInput);
      form.validateFields().then(async () => {
        try {
          const { data } = await api.post("/api/auth/register", dataInput);
          router.push("/employee/" + data.data.id);
        } catch (error) {
          console.log(error);
        }
      });
    };

   return (
      <div>
         <Form layout="vertical" hideRequiredMark form={form}>
            <Row gutter={16}>
               <Col span={6}>
                  <Form.Item
                     style={{ marginBottom: 10 }}
                     label="Username"
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
                     style={{ marginBottom: 10 }}
                     label="ID"
                     name="nationalityIDNum"
                     rules={[
                        {
                           required: true,
                        },
                     ]}
                  >
                     <Input placeholder="អត្តលេខ" />
                  </Form.Item>
               </Col>
            </Row>
            <Row gutter={16}>
               <Col span={6}>
                  <Form.Item
                     style={{ marginBottom: 10 }}
                     label="Department"
                     name="department"
                     rules={[
                        {
                           required: true,
                        },
                     ]}
                  >
                     <Select placeholder="ជ្រើសរើស">
                        <Option value="Department A">Department A</Option>
                        <Option value="Department B">Department B</Option>
                        <Option value="Department C">Department C</Option>
                     </Select>
                  </Form.Item>
               </Col>
            </Row>
            <Row gutter={16}>
               <Col span={6}>
                  <Form.Item
                     style={{ marginBottom: 10 }}
                     label="Role"
                     name="role"
                     rules={[
                        {
                           required: true,
                        },
                     ]}
                  >
                     <Select placeholder="ជ្រើសរើស">
                        <Option value="User">User</Option>
                        <Option value="Editor">Editor</Option>
                     </Select>
                  </Form.Item>
               </Col>
            </Row>
            <Button style={{ marginRight: 8 }} onClick={saveEmployee}>
               Add
            </Button>
         </Form>
      </div>
   );
};

export default Add;
