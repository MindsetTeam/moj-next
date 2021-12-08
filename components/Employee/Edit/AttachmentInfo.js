import React, { useState } from "react";
import styles from "@/styles/Employee.module.css";

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
   notification,
} from "antd";

import {
   PlusOutlined,
   UploadOutlined,
   DeleteOutlined,
   DownloadOutlined,
   DownOutlined,
} from "@ant-design/icons";
import { fetcher } from "@/lib/fetch";

const attachmentTypeName = {
   info: "ឯកសារផ្ទាល់ខ្លួន",
   rank: "ឋានន្តរសកិ្ត និងថ្នាក់",
   education: "សញ្ញាបត្រ",
   marriage: "សំបុត្រអាពាហ៍ពិពាហ៍",
   child: "សំបុត្រកំណើតកូន",
};

const attachmentInfo = ({ userData, fileTypeName }) => {
   const [selectedFileType, setSelectedFileType] = useState("");
   const [selectedFileName, setSelectedFileName] = useState("");
   const [fileNameList, setFileNameList] = useState(null);
   const [visible, setVisible] = useState(false);
   const [form] = Form.useForm();
   const [attachmentList, setAttachmentList] = useState(() => {
      return Object.keys(userData.attachment || {}).map((v, i) => {
         return {
            key: i,
            type: attachmentTypeName[v],
            children: userData.attachment[v].map((val) => ({
               ...val,
               parent: v,
            })),
         };
      });
   });

   const actionMenu = (record) => {
      return (
         <Menu>
            <Menu.Item
               key="0"
               icon={<DownloadOutlined />}
               // onClick={onEdit.bind(this, record)}
            >
               <a href={record.url} target="_blank">
                  ទាញយក
               </a>
            </Menu.Item>
            <Menu.Item
               key="1"
               icon={<DeleteOutlined />}
               onClick={onDelete.bind(this, record)}
            >
               <a>Delete</a>
            </Menu.Item>
         </Menu>
      );
   };

   const columns = [
      {
         title: "ប្រភេទឯកសារ",
         dataIndex: "type",
         key: "type",
         width: "15%",
      },
      {
         title: "ឯកសារ",
         dataIndex: "description",
         key: "description",
      },
      {
         title: "ផ្សេងៗ",
         key: "action",
         align: "center",
         render: (text, record, index) => {
            if (!record.children) {
               return (
                  <Dropdown overlay={() => actionMenu(record)}>
                     <a
                        className="ant-dropdown-link"
                        onClick={(e) => e.preventDefault()}
                     >
                        ផ្សេងៗ <DownOutlined />
                     </a>
                  </Dropdown>
               );
            }
         },
      },
   ];

   const onDelete = async (record) => {
      try {
         const res = await fetcher(
            "/api/users/" +
               userData.id +
               `/attachments?attachmentId=${record._id}&type=${record.parent}`,
            { method: "delete" }
         );
         notification.success({ message: res.msg });
         setAttachmentList(() => {
            return Object.keys(res.data.attachment).map((v, i) => {
               return {
                  key: i,
                  type: attachmentTypeName[v],
                  children: res.data.attachment[v].map((val) => ({
                     ...val,
                     parent: v,
                  })),
               };
            });
         });
      } catch (error) {
         notification.error({ message: error });
      }
   };

   const showModal = () => {
      setVisible(true);
   };
   const handleOk = () => {
      form.validateFields().then(async () => {
         const values = form.getFieldsValue();
         const formData = new FormData();
         if (values.attachment?.fileList?.length) {
            formData.append(
               "attachment",
               values.attachment?.fileList?.[0]?.originFileObj
            );
         }
         formData.append("type", values.type);
         formData.append("description", values.description);
         try {
            const res = await fetcher(
               "/api/users/" + userData.id + "/attachments",
               {
                  method: "POST",
                  body: formData,
               }
            );
            notification.success({ message: res.msg });
            form.resetFields();
            setAttachmentList(() => {
               return Object.keys(res.data.attachment).map((v, i) => {
                  return {
                     key: i,
                     type: attachmentTypeName[v],
                     children: res.data.attachment[v].map((val) => ({
                        ...val,
                        parent: v,
                     })),
                  };
               });
            });
            setVisible(false);
         } catch (error) {
            notification.error({ message: error });
         }
      });
   };

   return (
      <div className={styles.attachmentInfoContainer}>
         <Button
            style={{ marginRight: 8, marginBottom: 20 }}
            icon={<PlusOutlined></PlusOutlined>}
            onClick={showModal}
         >
            បន្ថែមឯកសារយោង
         </Button>
         <Table
            columns={columns}
            dataSource={attachmentList}
            expandable={{
               defaultExpandAllRows: true,
            }}
         ></Table>

         {/* Modal */}
         <Modal
            title="បន្ថែមឯកសារយោង"
            width={650}
            onCancel={() => setVisible(false)}
            visible={visible}
            onOk={handleOk}
            bodyStyle={{ paddingBottom: 80 }}
         >
            <Form form={form}>
               <Row gutter={16}>
                  <Col span={24}>
                     <Form.Item
                        name="type"
                        label="ប្រភេទឯកសារ"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសប្រភេទឯកសារ",
                           },
                        ]}
                     >
                        <Select
                           placeholder="ជ្រើសរើស"
                           onChange={(v) => {
                              setSelectedFileType(v);
                              setFileNameList(fileTypeName[v]);
                           }}
                        >
                           <Option value="info">ព័ត៌មានផ្ទាល់ខ្លួន</Option>
                           <Option value="family">ព័ត៌មានគ្រួសារ</Option>
                           <Option value="rank">
                              ក្របខណ្ឌ ឋាន្តរស័ក្តិ និងថ្នាក់
                           </Option>
                           <Option value="work">ប្រវត្តិការងារ</Option>
                           <Option value="education">ប្រវត្តិការសិក្សា</Option>
                           <Option value="status">ស្ថានភាពមន្រ្តី</Option>
                           {/* <Option value="marriage">សំបុត្រអាពាហ៍ពិពាហ៍</Option>
                           <Option value="child">សំបុត្រកំណើតកូន</Option> */}
                        </Select>
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={24}>
                     <Form.Item
                        name="description"
                        label="ឈ្មោះឯកសារ"
                        rules={[
                           {
                              required: true,
                              message: "សូមបំពេញឈ្មោះឯកសារ",
                           },
                        ]}
                     >
                        {/* <Input placeholder="ឈ្មោះឯកសារ" /> */}
                        <Select placeholder="ជ្រើសរើស">
                           {selectedFileType &&
                              fileNameList?.map((v, i) => {
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

               <Row gutter={16}>
                  <Col span={24}>
                     <Form.Item
                        name="attachment"
                        label="ប្រភេទឯកសារ"
                        rules={[
                           {
                              required: true,
                           },
                        ]}
                     >
                        <Upload accept="image/*,.pdf" maxCount={1}>
                           <Button icon={<UploadOutlined />}>ផ្ទុកឡើង</Button>
                        </Upload>
                     </Form.Item>
                  </Col>
               </Row>
            </Form>
         </Modal>
      </div>
   );
};

export default attachmentInfo;
