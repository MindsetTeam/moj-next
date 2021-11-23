import { Col, Row, Select, Form, Checkbox, Button } from "antd";
import React, { useState } from "react";

const { Option } = Select;

const SortOption = ({ ministryStructure }) => {
   const [form] = Form.useForm();

   const [choiceGeneralDepartment, setChoiceGeneralDepartment] = useState("");

   const [nearlyRetired, setNearlyRetired] = useState(false);

   const onSearch = () => {};

   const nearRetired = (e) => {
      setNearlyRetired(e.target.checked);
   };

   return (
      <Form form={form}>
         <Row gutter={16}>
            <Col span={6}>
               <Form.Item
                  style={{ marginBottom: 10 }}
                  name="generalDepartment"
                  label="អគ្គនាយកដ្ឋាន"
               >
                  <Select
                     placeholder="ជ្រើសរើស"
                     allowClear
                     onChange={(v) => {
                        setChoiceGeneralDepartment(v);
                        form.resetFields(["department"]);
                     }}
                  >
                     {Object.keys(
                        ministryStructure["ក្រសួងយុត្តិធម៌"]["ថ្នាក់កណ្តាល"]
                     ).map((v, i) => {
                        return (
                           <Option key={i} value={v}>
                              {v}
                           </Option>
                        );
                     })}
                  </Select>
               </Form.Item>
            </Col>
            <Col span={6}>
               <Form.Item
                  style={{ marginBottom: 10 }}
                  name="department"
                  label="នាយកដ្ឋាន"
               >
                  <Select placeholder="ជ្រើសរើស" allowClear>
                     {Object.keys(
                        ministryStructure["ក្រសួងយុត្តិធម៌"]["ថ្នាក់កណ្តាល"][
                           choiceGeneralDepartment
                        ] || {}
                     ).map((v, i) => {
                        return (
                           <Option key={i} value={v}>
                              {v}
                           </Option>
                        );
                     })}
                  </Select>
               </Form.Item>
            </Col>
            <Col span={4} style={{ marginTop: 5 }}>
               <Checkbox onChange={nearRetired}>ជិតចូលនិវត្តន៏</Checkbox>
            </Col>
            <Col span={4} style={{ marginTop: 5 }}>
               <Checkbox onChange={null}>ចូលនិវត្តន៏</Checkbox>
            </Col>
         </Row>
      </Form>
   );
};

export default SortOption;
