import React, { useState, useEffect } from "react";
import moment from "moment";
import {
   Drawer,
   Form,
   Button,
   Col,
   Row,
   Input,
   Select,
   DatePicker,
   Table,
   Tag,
   Space,
   Switch,
   Menu,
   Dropdown,
   Modal,
} from "antd";

import {
   PlusOutlined,
   EditOutlined,
   DeleteOutlined,
   PrinterOutlined,
   DownOutlined,
} from "@ant-design/icons";
import api from "@/utils/api";

const { Option } = Select;

const Rank = ({ userData }) => {
   const [form] = Form.useForm();
   const [visible, setVisible] = useState(false);
   const [startDate, setStartDate] = useState();
   const [endDate, setEndDate] = useState();
   const [nowOption, setNowOption] = useState(true);
   const [rankList, setRankList] = useState([...userData.rank]);
   const [editData, setEditData] = useState(null);

   const onStartDateChange = (date, dateString) => {
      setStartDate(dateString);
      console.log(dateString);
   };

   const onEndDateChange = (date, dateString) => {
      setEndDate(dateString);
      console.log(dateString);
   };

   const onNowChange = (checked) => {
      if (checked) {
         setNowOption(true);
         setEndDate(new Date());
      } else {
         setNowOption(false);
      }
   };

   const showDrawer = () => {
      setVisible(true);
   };

   const onClose = () => {
      setVisible(false);
   };

   const onClear = () => {
      form.resetFields();
   };

   const onSubmit = () => {
      const dataInput = form.getFieldsValue(true);
      form.validateFields().then(async () => {
         let updateData;
         if (editData) {
            updateData = {
               rank: rankList.map((v) =>
                  v._id === editData._id ? dataInput : v
               ),
            };
         } else {
            updateData = { rank: [...rankList, dataInput] };
         }

         const res = await api.put(`/api/users/${userData.id}`, updateData);
         setVisible(false);
         setRankList(res.data.data.rank);
         form.resetFields();
      });
   };

   const onEdit = (record) => {
      setEditData(record);
      setVisible(true);
   };

   const onDelete = async (record) => {
      let res = await api.put(`/api/users/${userData.id}`, {
         rank: rankList.filter((v) => v._id !== record._id),
      });
      setRankList(res.data.data.rank);
   };
   useEffect(() => {
      if (visible === false) {
         setEditData(null);
      }
      form.resetFields();
   }, [visible]);

   const actionMenu = (record) => {
      return (
         <Menu>
            <Menu.Item
               key="0"
               icon={<EditOutlined />}
               onClick={onEdit.bind(this, record)}
            >
               <a>Edit</a>
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
         title: "លេខលិខិតយោង",
         dataIndex: "refNum",
         key: "refNum",
      },
      {
         title: "ប្រភេទលក្ខន្តិកៈ",
         dataIndex: "statueType",
         key: "statueType",
      },
      {
         title: "ក្របខ័ណ្ឌ",
         dataIndex: "framework",
         key: "framework",
      },
      {
         title: "ឋានន្តរសកិ្ត និងថ្នាក់",
         dataIndex: "rankType",
         key: "rankType",
      },
      {
         title: "កម្រិតថ្នាក់",
         dataIndex: "level",
         key: "level",
      },
      {
         title: "ថ្ងៃខែឆ្នាំចុះហត្ថលេខា",
         dataIndex: "startDate",
         key: "startDate",
      },
      {
         title: "កំណត់សំគាល់",
         dataIndex: "otherNote",
         key: "otherNote",
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
      <div>
         <Button icon={<PlusOutlined />} onClick={showDrawer}>
            បញ្ចូលឋានន្តរសកិ្ត និងថ្នាក់
         </Button>
         <div style={{ marginTop: 20 }}>
            <Table columns={columns} dataSource={rankList}></Table>
         </div>

         {/* Modal */}
         <Modal
            title="បញ្ចូលឋាន្តរសក្កិ"
            width={800}
            onCancel={onClose}
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
            <Form
               layout="vertical"
               hideRequiredMark
               form={form}
               initialValues={{
                  ...editData,
                  startDate: editData?.startDate
                     ? moment(editData.startDate)
                     : null,
                  endDate: editData?.endDate ? moment(editData.endDate) : null,
               }}
            >
               <Row gutter={16}>
                  <Col span={9}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="refNum"
                        label="លេខលិខិតយោង"
                        rules={[
                           {
                              required: true,
                              message: "សូមបំពេញលេខលិខិតយោង",
                           },
                        ]}
                     >
                        <Input placeholder="លេខលិខិតយោង" />
                     </Form.Item>
                  </Col>
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="startDate"
                        label="កាលបរិច្ឆេទតែងតាំង"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសកាលបរិច្ឆេទតែងតាំង",
                           },
                        ]}
                     >
                        <DatePicker
                           style={{ width: "100%" }}
                           onChange={onStartDateChange}
                        />
                     </Form.Item>
                  </Col>
                  <Col span={3}>
                     <Form.Item
                        label="បច្ចុប្បន្ន"
                        style={{ marginBottom: 10 }}
                     >
                        <Switch defaultChecked onChange={onNowChange}></Switch>
                     </Form.Item>
                  </Col>
                  <Col span={6}>
                     <Form.Item
                        name="endDate"
                        label="កាលបរិច្ឆេទបញ្ចប់"
                        style={{ marginBottom: 10 }}
                     >
                        <DatePicker
                           disabled={nowOption}
                           style={{ width: "100%" }}
                           onChange={onEndDateChange}
                        />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="letterType"
                        label="ប្រភេទលិខិត"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសប្រភេទលិខិត",
                           },
                        ]}
                     >
                        <Select placeholder="ជ្រើសរើស">
                           <Option value="ព្រះរាជក្រឹត្យ">
                              ព្រះរាជក្រឹត្យ
                           </Option>
                           <Option value="ព្រះរាជក្រម">ព្រះរាជក្រម</Option>
                           <Option value="ដីការ">ដីការ</Option>
                           <Option value="លិខិតឧទ្ទេសនាម">
                              លិខិតឧទ្ទេសនាម
                           </Option>
                           <Option value="លិខិតបង្គាប់ការ">
                              លិខិតបង្គាប់ការ
                           </Option>
                           <Option value="អនុក្រឹត្យ">អនុក្រឹត្យ</Option>
                           <Option value="ប្រកាស">ប្រកាស</Option>
                        </Select>
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="promoteType"
                        label="ប្រភេទការតម្លើង"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសប្រភេទការតម្លើង",
                           },
                        ]}
                     >
                        <Select placeholder="ជ្រើសរើស">
                           <Option value="ថ្នាក់ប្រចាំឆ្នាំ">
                              ថ្នាក់ប្រចាំឆ្នាំ
                           </Option>
                           <Option value="ថ្នាក់កិត្តិយស">
                              ថ្នាក់កិត្តិយស
                           </Option>
                           <Option value="ថ្នាក់តាមកំរិតសញ្ញាប័ត្រ">
                              ថ្នាក់តាមកំរិតសញ្ញាប័ត្រ
                           </Option>
                           <Option value="និយ័តកម្ម">និយ័តកម្ម</Option>
                        </Select>
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="statueType"
                        label="ប្រភេទលក្ខន្តិកៈ"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសប្រភេទលក្ខន្តិកៈ",
                           },
                        ]}
                     >
                        <Select placeholder="ជ្រើសរើស">
                           <Option value="លក្ខន្តិកៈរដ្ឋបាលទូទៅ">
                              លក្ខន្តិកៈរដ្ឋបាលទូទៅ
                           </Option>
                        </Select>
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="framework"
                        label="ក្របខ័ណ្ឌ"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសក្របខ័ណ្ឌ",
                           },
                        ]}
                     >
                        <Select placeholder="ជ្រើសរើស">
                           <Option value="a">a</Option>
                           <Option value="b">b</Option>
                           <Option value="c">c</Option>
                        </Select>
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="rankType"
                        label="ឋានន្តរស័ក្តិ និងថ្នាក់"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសឋានន្តរស័ក្តិ និងថ្នាក់",
                           },
                        ]}
                     >
                        <Select placeholder="ជ្រើសរើស">
                           <Option value="a">a</Option>
                           <Option value="b">b</Option>
                           <Option value="c">c</Option>
                        </Select>
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="level"
                        label="កម្រិតថ្នាក់"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសកម្រិតថ្នាក់",
                           },
                        ]}
                     >
                        <Select placeholder="ជ្រើសរើស">
                           <Option value="a">a</Option>
                           <Option value="b">b</Option>
                           <Option value="c">c</Option>
                        </Select>
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={24}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="otherNote"
                        label="កំណត់សម្គាល់"
                        rules={[
                           {
                              required: true,
                              message: "សូមបំពេញកំណត់សម្គាល់",
                           },
                        ]}
                     >
                        <Input placeholder="កំណត់សម្គាល់" />
                     </Form.Item>
                  </Col>
               </Row>
            </Form>
         </Modal>
      </div>
   );
};

export default Rank;
