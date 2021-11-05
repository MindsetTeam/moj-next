import styles from "@/styles/Employee.module.css";
import { AlertDispatch } from "contexts/alert.context";
import {
   UserOutlined,
   PlusOutlined,
   DeleteOutlined,
   EditOutlined,
   // UploadOutlined,
} from "@ant-design/icons";
import React, { useState, useEffect, useContext } from "react";
import moment from "moment";

import {
   Col,
   Row,
   Form,
   Input,
   DatePicker,
   Radio,
   Button,
   Space,
   Table,
   Drawer,
   // Upload,
} from "antd";
import api from "@/utils/api";

const genderOptions = [
   { label: "ប្រុស", value: "ប្រុស" },
   { label: "ស្រី", value: "ស្រី" },
];

const statusOptions = [
   { label: "រស់", value: "រស់" },
   { label: "ស្លាប់", value: "ស្លាប់" },
];

const childrenInfo = ({ userData }) => {
   const columns = [
      {
         title: "លេខសំបុត្រកំណើត",
         dataIndex: "birthCertificateNum",
         key: "birthCertificateNum",
      },
      {
         title: "គោត្តនាម និងនាម",
         dataIndex: "fullName",
         key: "fullName",
      },
      {
         title: "គោត្តនាម និងនាមឡាតាំង",
         dataIndex: "fullNameLatin",
         key: "fullNameLatin",
      },
      {
         title: "ភេទ",
         dataIndex: "gender",
         key: "gender",
      },
      {
         title: "ថ្ងៃខែឆ្នាំកំណើត",
         dataIndex: "birthDate",
         key: "birthDate",
         render: (text) => moment(text).local(true).format("DD/MM/YYYY"),
      },
      {
         title: "មុខរបរ",
         dataIndex: "occupation",
         key: "occupation",
      },
      {
         title: "ផ្សេងៗ",
         key: "action",
         render: (text, record) => (
            <Space size="middle">
               <Button
                  icon={<EditOutlined />}
                  onClick={() => {
                     setEditData(record);
                     setVisible(true);
                  }}
               >
                  Edit
               </Button>
               <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={async () => {
                     let res = await api.put(`/api/users/${userData.id}`, {
                        children: childrenList.filter(
                           (v) => v._id !== record._id
                        ),
                     });
                     dispatch({
                        type: "SUCCESS",
                        payload: {
                           message: "ពត័មានត្រូវបានលុប",
                           //  description: "បានរក្សាទុក",
                        },
                     });
                     setChildrenList(res.data.data.children);
                  }}
               >
                  Delete
               </Button>
            </Space>
         ),
      },
   ];

   const dispatch = useContext(AlertDispatch);
   const [form] = Form.useForm();
   // const [childInfo, setChildInfo] = useState(null);
   const [visible, setVisible] = useState(false);
   const [childrenList, setChildrenList] = useState([...userData.children]);
   const [editData, setEditData] = useState(null);

   const onClose = () => {
      setVisible(false);
   };

   const onSubmit = () => {
      const dataInput = form.getFieldsValue(true);
      form.validateFields().then(async () => {
         let updateData;
         if (editData) {
            updateData = {
               children: childrenList.map((v) =>
                  v._id == editData._id ? dataInput : v
               ),
            };
         } else {
            updateData = { children: [...childrenList, dataInput] };
         }
         let res = await api.put(`/api/users/${userData.id}`, updateData);
         setVisible(false);
         setChildrenList(res.data.data.children);
         dispatch({
            type: "SUCCESS",
            payload: {
               message: "បានរក្សាទុក",
               //  description: "បានរក្សាទុក",
            },
         });
         form.resetFields();
      });
   };
   useEffect(() => {
      if (visible === false) {
         setEditData(null);
      }
      form.resetFields();
   }, [visible]);

   return (
      <div className={styles.childrenInfoContainer}>
         <h1 className={styles.title} style={{ marginBottom: 20 }}>
            <UserOutlined></UserOutlined>ព័ត៌មានកូន
         </h1>
         <Button icon={<PlusOutlined />} onClick={() => setVisible(true)}>
            បញ្ចូលកូន
         </Button>
         <div style={{ marginTop: 20 }}>
            <Table columns={columns} dataSource={childrenList}></Table>
         </div>

         {/* Drawer */}
         <Drawer
            title="បញ្ចូលព័ត៌មានកូន"
            width={720}
            onClose={() => setVisible(false)}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
               <div
                  style={{
                     textAlign: "center",
                  }}
               >
                  <Button onClick={onClose} style={{ marginRight: 8 }} danger>
                     Cancel
                  </Button>
                  <Button onClick={onSubmit} type="primary">
                     Submit
                  </Button>
               </div>
            }
         >
            <Form
               layout="vertical"
               hideRequiredMark
               form={form}
               initialValues={{
                  ...editData,
                  birthDate: editData?.birthDate
                     ? moment(editData.birthDate)
                     : null,
               }}
            >
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="birthCertificateNum"
                        label="លេខសំបុត្រកំណើត និងថ្ងៃខែឆ្នាំ"
                        // rules={[
                        //    {
                        //       required: true,
                        //       message: "សូមបំពេញលេខសំបុត្រកំណើត",
                        //    },
                        // ]}
                     >
                        <Input placeholder="លេខសំបុត្រកំណើត" />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="nationalityIDNum"
                        label="លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ"
                        // rules={[
                        //    {
                        //       required: true,
                        //       message: "សូមបំពេញលេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ",
                        //    },
                        // ]}
                     >
                        <Input placeholder="លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ" />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="fullName"
                        label="គោត្តនាម និងនាម"
                        rules={[
                           {
                              required: true,
                              message: "សូមបំពេញគោត្តនាម និងនាម",
                           },
                        ]}
                     >
                        <Input placeholder="គោត្តនាម និងនាម" />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="fullNameLatin"
                        label="គោត្តនាម និងនាម​ទ្បារតាំង"
                        rules={[
                           {
                              required: true,
                              message: "សូមបំពេញគោត្តនាម និងនាម​ទ្បារតាំង",
                           },
                        ]}
                     >
                        <Input placeholder="គោត្តនាម និងនាម​ទ្បារតាំង" />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="birthDate"
                        label="ថ្ងៃខែឆ្នាំកំណើត"
                        rules={[
                           {
                              required: true,
                              message: "សូមបំពេញថ្ងៃខែឆ្នាំកំណើត",
                           },
                        ]}
                     >
                        <DatePicker
                           placeholder="ថ្ងៃខែឆ្នាំកំណើត"
                           style={{ width: "100%" }}
                           format="DD/MM/YYYY"
                           //  onChange={onStartDateChange}
                        />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="gender"
                        label="ភេទ"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសភេទ",
                           },
                        ]}
                     >
                        <Radio.Group options={genderOptions}></Radio.Group>
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="occupation"
                        label="មុខរបរ"
                        rules={[
                           {
                              required: true,
                              message: "សូមបំពេញមុខរបរ",
                           },
                        ]}
                     >
                        <Input placeholder="មុខរបរ" />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="livingStatus"
                        label="ស្ថានភាព"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសស្ថានភាព",
                           },
                        ]}
                     >
                        <Radio.Group options={statusOptions}></Radio.Group>
                     </Form.Item>
                  </Col>
               </Row>
               {/* <Row>
                  <Col span={24}>
                     <div>
                        <p>File Name</p>
                        <Upload>
                           <Button icon={<UploadOutlined />}>
                              ឯកសារសំបុត្រកំណើតកូន
                           </Button>
                        </Upload>
                     </div>
                  </Col>
               </Row> */}
            </Form>
         </Drawer>
      </div>
   );
};

export default childrenInfo;
