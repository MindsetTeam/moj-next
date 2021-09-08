import React, { useState } from "react";
import styles from "@/styles/Edit.module.css";

import {
   Table,
   Button,
   Modal,
   Input,
   Select,
   Form,
   Row,
   Col,
   Upload,
   Menu,
   Dropdown,
} from "antd";

import {
   PlusOutlined,
   UploadOutlined,
   DeleteOutlined,
   DownloadOutlined,
   DownOutlined,
} from "@ant-design/icons";

const attachmentInfo = () => {
   const [visible, setVisible] = useState(false);
   const [form] = Form.useForm();

   const actionMenu = (record) => {
      return (
         <Menu>
            <Menu.Item
               key="0"
               icon={<DownloadOutlined />}
               // onClick={onEdit.bind(this, record)}
            >
               <a>ទាញយក</a>
            </Menu.Item>
            <Menu.Item
               key="1"
               icon={<DeleteOutlined />}
               // onClick={onDelete.bind(this, record)}
            >
               <a>Delete</a>
            </Menu.Item>
         </Menu>
      );
   };

   const columns = [
      {
         title: "ឯកសារ",
         dataIndex: "attachment",
         key: "attachment",
      },
      {
         title: "ប្រភេទឯកសារ",
         dataIndex: "attachmentType",
         key: "attachmentType",
      },
      {
         title: "ផ្សេងៗ",
         key: "action",
         align: "center",
         render: (text, record) => (
            <Dropdown overlay={() => actionMenu(record)}>
               <a
                  className="ant-dropdown-link"
                  onClick={(e) => e.preventDefault()}
               >
                  ផ្សេងៗ <DownOutlined />
               </a>
            </Dropdown>
         ),
      },
   ];

   const data = [
      {
         key: "1",
         attachment: "John Brown",
         attachmentType: "hi",
      },
      {
         key: "2",
         attachment: "123123",
         attachmentType: "hi",
      },
   ];

   const showModal = () => {
      setVisible(true);
   };

   return (
      <div className={styles.attachmentInfoContainer}>
         <Button
            style={{ marginRight: 8, marginBottom: 20 }}
            onClick={showModal}
            icon={<PlusOutlined></PlusOutlined>}
         >
            បន្ថែមឯកសារយោង
         </Button>
         <Table columns={columns} dataSource={data}></Table>

         {/* Modal */}
         <Modal
            title="បន្ថែមឯកសារយោង"
            width={650}
            onCancel={() => setVisible(false)}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
         >
            <Form hideRequiredMark form={form}>
               <Row gutter={16}>
                  <Col span={24}>
                     <Form.Item
                        name="attachment"
                        label="ឈ្មោះឯកសារ"
                        rules={[
                           {
                              required: true,
                              message: "សូមបំពេញឈ្មោះឯកសារ",
                           },
                        ]}
                     >
                        <Input placeholder="ឈ្មោះឯកសារ" />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={24}>
                     <Form.Item
                        name="attachmentType"
                        label="ប្រភេទឯកសារ"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសប្រភេទឯកសារ",
                           },
                        ]}
                     >
                        <Select placeholder="ជ្រើសរើស">
                           <Option value="ឯកសារផ្ទាល់ខ្លួន">
                              ឯកសារផ្ទាល់ខ្លួន
                           </Option>
                           <Option value="ឋានន្តរសកិ្ត និងថ្នាក់">
                              ឋានន្តរសកិ្ត និងថ្នាក់
                           </Option>
                           <Option value="សញ្ញាបត្រ">សញ្ញាបត្រ</Option>
                           <Option value="សំបុត្រអាពាហ៍ពិពាហ៍">
                              សំបុត្រអាពាហ៍ពិពាហ៍
                           </Option>
                           <Option value="សំបុត្រកំណើតកូន">
                              សំបុត្រកំណើតកូន
                           </Option>
                        </Select>
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={24}>
                     <Upload>
                        <Button icon={<UploadOutlined />}>Upload</Button>
                     </Upload>
                  </Col>
               </Row>
            </Form>
         </Modal>
      </div>
   );
};

export default attachmentInfo;
