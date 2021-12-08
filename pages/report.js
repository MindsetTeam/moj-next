import PrintReport from "@/components/Report/PrintReport";
import styles from "@/styles/Print.module.css";
import structureMinistryData from "/data/Structure.json";

import React, { useEffect, useState } from "react";
import { Col, Row, Select, Form, Checkbox, Button } from "antd";
import { PrinterOutlined } from "@ant-design/icons";
import { fetcher } from "@/lib/fetch";

const { Option } = Select;

const Report = () => {
   const [form] = Form.useForm();

   const [choiceGeneralDepartment, setChoiceGeneralDepartment] = useState("");
   const [printEmployees, setPrintEmployees] = useState([])

   const onPrint = () => {
      window.print();
   };
   const fetchEmployees = async (query) => {
      if(!query.generalDepartment){
         return setPrintEmployees([]);
      }
      let searchQuery = new URLSearchParams();
      Object.keys(query).forEach((v)=>{
         searchQuery.append(v, query[v]);
      })
      const {data} = await fetcher('/api/users?'+ searchQuery.toString())
      setPrintEmployees(data);
   }
   return (
      <div className={styles.printReportContainer}>
         <Form form={form} onValuesChange={(changed, allValues) => {
            console.log(changed)
            if(changed.generalDepartment){
               delete allValues.department
            }
             fetchEmployees(allValues);
         }}>
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
                           structureMinistryData["ក្រសួងយុត្តិធម៌"][
                              "ថ្នាក់កណ្តាល"
                           ]
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
                           structureMinistryData["ក្រសួងយុត្តិធម៌"][
                              "ថ្នាក់កណ្តាល"
                           ][choiceGeneralDepartment] || {}
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
                  <Button icon={<PrinterOutlined />} onClick={onPrint}>
                     បោះពុម្ព
                  </Button>
               </Col>
            </Row>
         </Form>
         <PrintReport printEmployees={printEmployees} />
      </div>
   );
};

export default Report;
