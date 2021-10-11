import React, { useState } from "react";
import styles from "@/styles/Announcement.module.css";

import { Button, Table, Modal, Dropdown, Menu, Form, Input } from "antd";

import {
   PlusOutlined,
   EditOutlined,
   DeleteOutlined,
   DownOutlined,
} from "@ant-design/icons";

const Announcement = () => {
   const [announcementList, setAnnouncementList] = useState([
      {
         announcement: "Do Lorem sit ad fugiat cillum eiusmod do.",
         //  status: "active",
      },
      {
         announcement: "Do Lorem sit ad fugiat cillum eiusmod do.",
         //  status: "Inactive",
      },
   ]);

   const [visible, setVisible] = useState(false);
   const [form] = Form.useForm();
   const [editData, setEditData] = useState(null);

   const toggleModal = () => {
      setVisible(!visible);
   };

   const onClear = () => {
      form.resetFields();
   };

   const onSubmit = () => {};

   const actionMenu = (record) => {
      return (
         <Menu>
            <Menu.Item
               key="0"
               icon={<EditOutlined />}
               //    onClick={onEdit.bind(this, record)}
            >
               <a>Edit</a>
            </Menu.Item>
            <Menu.Item
               key="1"
               icon={<DeleteOutlined />}
               //    onClick={onDelete.bind(this, record)}
            >
               <a>Delete</a>
            </Menu.Item>
         </Menu>
      );
   };

   const columns = [
      {
         title: "សេចក្ដីជូនដំណឹង",
         dataIndex: "announcement",
         key: "announcement",
      },
      {
         title: "ផ្សេងៗ",
         key: "action",
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

   return (
      <div className={styles.container}>
         <Button icon={<PlusOutlined />} onClick={toggleModal}>
            បញ្ចូលសេចក្ដីជូនដំណឹង
         </Button>

         <div style={{ marginTop: 20 }}>
            <Table columns={columns} dataSource={announcementList}></Table>
         </div>

         {/* Modal Add */}
         <Modal
            title="បញ្ចូលសេចក្ដីជូនដំណឹង"
            width={800}
            onCancel={toggleModal}
            visible={visible}
            bodyStyle={{ paddingBottom: 80 }}
            footer={
               <div
                  style={{
                     textAlign: "center",
                  }}
               >
                  <Button onClick={onClear} style={{ marginRight: 8 }}>
                     Clear
                  </Button>
                  <Button onClick={onSubmit} type="primary">
                     Submit
                  </Button>
               </div>
            }
         >
            <Form hideRequiredMark form={form}>
               <Form.Item
                  style={{ marginBottom: 10 }}
                  name="photo"
                  label="សេចក្ដីជូនដំណឹង"
                  rules={[
                     {
                        required: true,
                        message: "សូមបំពេញសេចក្ដីជូនដំណឹង",
                     },
                  ]}
               >
                  <Input placeholder="សេចក្ដីជូនដំណឹង" />
               </Form.Item>
            </Form>
         </Modal>
      </div>
   );
};

export default Announcement;
