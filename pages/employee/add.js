import { useSession } from "next-auth/client";
import React, { useState, useEffect, useContext } from "react";
import styles from "@/styles/Employee.module.css";
import { AlertDispatch } from "contexts/alert.context";

import api from "@/utils/api";

import { Button, Form, Col, Row, Input, Select } from "antd";

import structureMinistryData from "/data/Structure.json";

const { Option } = Select;

const data = structureMinistryData["ក្រសួងយុត្តិធម៌"];
const generalDepartmentData = [];
let departmentData = {};
for (const key in data) {
   if (Object.hasOwnProperty.call(data, key)) {
      departmentData = { ...departmentData, ...data[key] };
      generalDepartmentData.push(...Object.keys(data[key]));
   }
}

const Add = () => {
   const dispatch = useContext(AlertDispatch);

   const [form] = Form.useForm();
   const [generalDepartment, setGeneralDepartment] = useState(
      generalDepartmentData
   );
   const [selectedGeneralDepartment, setSelectedGeneralDepartment] =
      useState("");
   const [department, setDepartment] = useState([]);
   const [selectedGeneralDepartmentEdit, setSelectedGeneralDepartmentEdit] =
      useState("");

   const [session, loading] = useSession();

   useEffect(() => {
      form.resetFields(["department"]);
      setDepartment([
         ...Object.keys(departmentData[selectedGeneralDepartment] || {}),
      ]);
   }, [selectedGeneralDepartment]);

   const saveEmployee = async () => {
      const dataInput = form.getFieldsValue(true);
      console.log(dataInput);
      form.validateFields().then(async () => {
         try {
            const { data } = await api.post("/api/auth/register", dataInput);
            dispatch({
               type: "SUCCESS",
               payload: {
                  message: "User Added",
               },
            });
            router.push("/employee/" + data.data.id);
         } catch (error) {
            console.log(error);
         }
      });
   };

   return (
      <div className={styles.addUserContainer}>
         <div>
            <h1>Add New User</h1>
            <Form layout="vertical" hideRequiredMark form={form}>
               <Row gutter={16}>
                  <Col span={24}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        label="Username"
                        name="firstName"
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
                  <Col span={24}>
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
               {session?.user.role === "admin" && (
                  <>
                     <Row gutter={16}>
                        <Col span={24}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              label="អគ្គនាយកដ្ឋាន"
                              name="generalDepartment"
                              rules={[
                                 {
                                    required: true,
                                 },
                              ]}
                           >
                              <Select
                                 placeholder="ជ្រើសរើស"
                                 onChange={setSelectedGeneralDepartment}
                              >
                                 {generalDepartment.map((v, i) => {
                                    return (
                                       <Option value={v} key={i}>
                                          {v}
                                       </Option>
                                    );
                                 })}
                              </Select>
                           </Form.Item>
                        </Col>
                     </Row>
                     <Row gutter={16}>
                        <Col span={24}>
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
                                 {department.map((v, i) => {
                                    return (
                                       <Option key={i} value={v}>
                                          {v}
                                       </Option>
                                    );
                                 })}
                              </Select>
                           </Form.Item>
                        </Col>
                     </Row>
                  </>
               )}
               <Row gutter={16}>
                  <Col span={24}>
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
                           <Option value="user">User</Option>
                           <Option value="moderator">Moderator</Option>
                           <Option value="editor">Editor</Option>
                        </Select>
                     </Form.Item>
                  </Col>
               </Row>
               <Button onClick={saveEmployee} className={styles.btnAdd}>
                  Add
               </Button>
            </Form>
         </div>
      </div>
   );
};
Add.allowed_roles = ['admin', 'editor']
export default Add;
