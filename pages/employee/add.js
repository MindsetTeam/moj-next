import { useSession } from "next-auth/client";
import React, { useState, useEffect, useContext } from "react";
import styles from "@/styles/Employee.module.css";
import { useRouter } from "next/router";
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
  const router = useRouter();
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
    // console.log(dataInput);
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
        <h1>បន្ថែមអ្នកប្រើប្រាស់ថ្មី</h1>
        <Form layout="vertical" form={form}>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="គោត្តនាមឡាតាំង"
                name="firstNameLatin"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="គោត្តនាមឡាតាំង" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="នាមឡាតាំង"
                name="lastNameLatin"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="នាមឡាតាំង" />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="លេខអត្តសញ្ញាណប័ណ្ណ"
                name="nationalityIDNum"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Input placeholder="លេខអត្តសញ្ញាណប័ណ្ណ" />
              </Form.Item>
            </Col>
          </Row>
          {/* {session?.user.role === "admin" && (
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
               )} */}
          <Row gutter={16}>
            <Col span={24}>
              <Form.Item
                style={{ marginBottom: 10 }}
                label="តួនាទី"
                name="role"
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <Select placeholder="ជ្រើសរើស">
                  {session?.user.role == "admin" && (
                    <Option value="editor">Editor</Option>
                  )}
                  <Option value="moderator">Moderator</Option>
                  <Option value="user">User</Option>
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
Add.allowed_roles = ["admin", "editor"];
export default Add;
