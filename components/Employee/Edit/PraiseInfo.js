import React, { useEffect, useState, useContext } from "react";
import moment from "moment";
import styles from "@/styles/Employee.module.css";
import { AlertDispatch } from "contexts/alert.context";
import {
   Form,
   Menu,
   Button,
   Col,
   Row,
   Dropdown,
   Input,
   Select,
   DatePicker,
   Table,
   Modal,
} from "antd";

const { Option } = Select;
import api from "@/utils/api";

import {
   PlusOutlined,
   DownOutlined,
   EditOutlined,
   DeleteOutlined,
} from "@ant-design/icons";

const Praise = ({ userData }) => {
   const dispatch = useContext(AlertDispatch);

   const [visible, setVisible] = useState(false);
   const [signDate, setSignDate] = useState();
   const [praiseList, setPraiseList] = useState([]);
   const [form] = Form.useForm();
   const [editData, setEditData] = useState(null);
   useEffect(() => {
      setPraiseList([...userData.praised]);
   }, [userData]);

   const onSignDateChange = (date, dateString) => {
      setSignDate(dateString);
      console.log(dateString);
   };

   const showModal = () => {
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
               praised: praiseList.map((v) =>
                  v._id === editData._id ? dataInput : v
               ),
            };
         } else {
            updateData = { praised: [...praiseList, dataInput] };
         }
         const res = await api.put(`/api/users/${userData.id}`, updateData);
         dispatch({
            type: "SUCCESS",
            payload: {
               message: "បានរក្សាទុក",
               //  description: "បានរក្សាទុក",
            },
         });
         setVisible(false);
         setPraiseList(res.data.data.praised);
         form.resetFields();
      });
   };

   useEffect(() => {
      if (visible === false) {
         setEditData(null);
      }
      form.resetFields();
   }, [visible]);

   const onEdit = (record) => {
      setEditData(record);
      setVisible(true);
   };

   const onDelete = async (record) => {
      let res = await api.put(`/api/users/${userData.id}`, {
         praised: praiseList.filter((v) => v._id !== record._id),
      });
      setPraiseList(res.data.data.praised);
   };

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
         title: "ប្រភេទការលើកសសើរ",
         dataIndex: "letterType",
         key: "letterType",
      },
      // {
      //    title: "រូបភាពលើកសសើរ",
      //    dataIndex: "photo",
      //    key: "photo",
      // },
      {
         title: "ថ្ងៃខែឆ្នាំចុះហត្ថលេខា",
         dataIndex: "date",
         key: "date",
         render: (text) => moment(text).local(true).format("DD/MM/YYYY"),
      },
      {
         title: "ក្រសួង-ស្ថាប័ន",
         dataIndex: "ministry",
         key: "ministry",
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
      <div className={styles.praiseInfoContainer}>
         <Button icon={<PlusOutlined />} onClick={showModal}>
            បញ្ចូលការលើកសសើរ
         </Button>
         <div style={{ marginTop: 20 }}>
            <Table columns={columns} dataSource={praiseList}></Table>
         </div>

         {/* Modal */}
         <Modal
            title="បញ្ចូលព័ត៌មានការលើកសសើរ"
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
                  date: editData?.date ? moment(editData.date) : null,
               }}
            >
               <Row gutter={16}>
                  <Col span={24}>
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
               </Row>
               <Row gutter={16}>
                  <Col span={24}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="date"
                        label="កាលបរិច្ឆេទ"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសកាលបរិច្ឆេទ",
                           },
                        ]}
                     >
                        <DatePicker
                           style={{ width: "100%" }}
                           format="DD/MM/YYYY"
                           onChange={onSignDateChange}
                        />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={24}>
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
               </Row>
               <Row gutter={16}>
                  <Col span={24}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="ministry"
                        label="ក្រសួង-ស្ថាប័ន"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសក្រសួង-ស្ថាប័ន",
                           },
                        ]}
                     >
                        <Select placeholder="ជ្រើសរើស">
                           <Option value="ក្រសួងកសិកម្ម រុក្ខាប្រមាញ់ និងនេសាទ">
                              ក្រសួងកសិកម្ម រុក្ខាប្រមាញ់ និងនេសាទ
                           </Option>
                           <Option value="ទំនាក់ទំនងជាមួយរដ្ឋសភា-ព្រឹទ្ធសភា និង អធិការកិច្ច">
                              ទំនាក់ទំនងជាមួយរដ្ឋសភា-ព្រឹទ្ធសភា និង អធិការកិច្ច
                           </Option>
                           <Option value="អាកាសចរស៊ីវិល">អាកាសចរស៊ីវិល</Option>
                           <Option value="ក្រសួងមុខងារសាធារណៈ">
                              ក្រសួងមុខងារសាធារណៈ
                           </Option>
                           <Option value="ក្រសួងពាណិជ្ជកម្ម">
                              ក្រសួងពាណិជ្ជកម្ម
                           </Option>
                           <Option value="ទីស្តីការគណៈរដ្ឋមន្ត្រី">
                              ទីស្តីការគណៈរដ្ឋមន្ត្រី
                           </Option>
                           <Option value="ក្រសួងធម្មការ និងសាសនា">
                              ក្រសួងធម្មការ និងសាសនា
                           </Option>
                           <Option value="ក្រសួងវប្បធម៌ និង វិចិត្រសិល្បៈ">
                              ក្រសួងវប្បធម៌ និង វិចិត្រសិល្បៈ
                           </Option>
                           <Option value="ក្រសួងសេដ្ឋកិច្ច និង ហិរញ្ញវត្ថុ">
                              ក្រសួងសេដ្ឋកិច្ច និង ហិរញ្ញវត្ថុ
                           </Option>
                           <Option value="ក្រសួងអប់រំ យុវជន និង កីទ្បា">
                              ក្រសួងអប់រំ យុវជន និង កីទ្បា
                           </Option>
                           <Option value="ក្រសួងក្រសួងបរិស្ថាន">
                              ក្រសួងក្រសួងបរិស្ថាន
                           </Option>
                           <Option value="ការបរទេស និង សហប្រតិបត្តិការអន្តរជាតិ">
                              ការបរទេស និង សហប្រតិបត្តិការអន្តរជាតិ
                           </Option>
                           <Option value="ក្រសួងសុខាភិបាល">
                              ក្រសួងសុខាភិបាល
                           </Option>
                           <Option value="ឧស្សាហកម្ម និងសិប្បកម្ម">
                              ឧស្សាហកម្ម និងសិប្បកម្ម
                           </Option>
                           <Option value="ក្រសួងព័ត៌មាន">ក្រសួងព័ត៌មាន</Option>
                           <Option value="ក្រសួងមហាផ្ទៃ">ក្រសួងមហាផ្ទៃ</Option>
                           <Option value="ក្រសួងយុត្តិធម៌">
                              ក្រសួងយុត្តិធម៌
                           </Option>
                           <Option value="ក្រសួងការពារជាតិ">
                              ក្រសួងការពារជាតិ
                           </Option>
                           <Option value="ក្រសួងផែនការ">ក្រសួងផែនការ</Option>
                           <Option value="ក្រសួងក្រសួងប្រៃសណីយ៍ និងទូរគមនាគមន៍">
                              ក្រសួងក្រសួងប្រៃសណីយ៍ និងទូរគមនាគមន៍
                           </Option>
                           <Option value="ក្រសួងសាធារណការ និង ដឹកជញ្ជូន">
                              ក្រសួងសាធារណការ និង ដឹកជញ្ជូន
                           </Option>
                           <Option value="ក្រសួងព្រះបរមរាជវាំង">
                              ក្រសួងព្រះបរមរាជវាំង
                           </Option>
                           <Option value="ក្រសួងអភិវឌ្ឍន៍ជនបទ">
                              ក្រសួងអភិវឌ្ឍន៍ជនបទ
                           </Option>
                           <Option value="សង្គមកិច្ច អតីតយុទ្ធជន និងយុវនីតិសម្បទា">
                              សង្គមកិច្ច អតីតយុទ្ធជន និងយុវនីតិសម្បទា
                           </Option>
                           <Option value="ក្រសួងទេសចរណ៍">ក្រសួងទេសចរណ៍</Option>
                           <Option value="ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និង សំណង់">
                              ក្រសួងរៀបចំដែនដី នគរូបនីយកម្ម និង សំណង់
                           </Option>
                           <Option value="ក្រសួងធនធានទឹក និង ឧតុនិយម">
                              ក្រសួងធនធានទឹក និង ឧតុនិយម
                           </Option>
                           <Option value="ក្រសួងកិច្ចការនារី">
                              ក្រសួងកិច្ចការនារី
                           </Option>
                           <Option value="តុលាការកំពូល">តុលាការកំពូល</Option>
                           <Option value="សាលាមធ្យមសិក្សា សុខាភិបាលភូមិភាគ">
                              សាលាមធ្យមសិក្សា សុខាភិបាលភូមិភាគ
                           </Option>
                           <Option value="ការងារ និងបណ្តុះបណ្តាលវិជ្ជាជីវៈ">
                              ការងារ និងបណ្តុះបណ្តាលវិជ្ជាជីវៈ
                           </Option>
                           <Option value="អង្គភាពប្រឆាំងអំពើពុករលួយ">
                              អង្គភាពប្រឆាំងអំពើពុករលួយ
                           </Option>
                           <Option value="ក្រសួងរ៉ែ និងថាមពល">
                              ក្រសួងរ៉ែ និងថាមពល
                           </Option>
                           <Option value="សាលាឧទ្ធរណ៍">សាលាឧទ្ធរណ៍</Option>
                           <Option value="រដ្ឋលេខាធិការដ្ឋានមុខងារសាធារណៈ">
                              រដ្ឋលេខាធិការដ្ឋានមុខងារសាធារណៈ
                           </Option>
                           <Option value="ធនាគាជាតិនៃកម្ពុជា">
                              ធនាគាជាតិនៃកម្ពុជា
                           </Option>
                           <Option value="ព្រឹទ្ធសភាជាតិ">
                              ព្រឹទ្ធសភាជាតិ
                           </Option>
                           <Option value="រដ្ឋសភាជាតិ">រដ្ឋសភាជាតិ</Option>
                           <Option value="គណៈកម្មាធិការជាតិរៀបចំការបោះឆ្នោត (គ.ជ.ប)">
                              គណៈកម្មាធិការជាតិរៀបចំការបោះឆ្នោត (គ.ជ.ប)
                           </Option>
                           <Option value="អង្គជំនុំជម្រះវិសាមញ្ញក្នុងតុលាការ">
                              អង្គជំនុំជម្រះវិសាមញ្ញក្នុងតុលាការ
                           </Option>
                        </Select>
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={24}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="type"
                        label="ប្រភេទការលើកសសើរ"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសប្រភេទការលើកសសើរ",
                           },
                        ]}
                     >
                        <Select placeholder="ជ្រើសរើស">
                           <Option value="មេដាយជាតូបការ">មេដាយជាតូបការ</Option>
                           <Option value="មេដាយព្រះរាជាណាចក្រកម្ពុជា">
                              មេដាយព្រះរាជាណាចក្រកម្ពុជា
                           </Option>
                           <Option value="មេដាយឯករាជ្យជាតិ">
                              មេដាយឯករាជ្យជាតិ
                           </Option>
                           <Option value="មេដាយសម្តេចព្រះមហាក្សត្រីយានីព្រះស៊ីសុវត្ថិមុនីវង្សកុសុមៈនារីរ័ត្ន">
                              មេដាយសម្តេចព្រះមហាក្សត្រីយានីព្រះស៊ីសុវត្ថិមុនីវង្សកុសុមៈនារីរ័ត្ន
                           </Option>
                           <Option value="មេដាយរាជសម្បត្តិ">
                              មេដាយរាជសម្បត្តិ
                           </Option>
                           <Option value="មេដាយរជ្ជកាល">មេដាយរជ្ជកាល</Option>
                           <Option value="មេដាយអនុស្សរា">មេដាយអនុស្សរា</Option>
                           <Option value="មេដាយសេនាជ័យសិទ្ធ">
                              មេដាយសេនាជ័យសិទ្ធ
                           </Option>
                           <Option value="មេដាយការពារជាតិ">
                              មេដាយការពារជាតិ
                           </Option>
                           <Option value="មេដាយសហមេត្រី">មេដាយសហមេត្រី</Option>
                           <Option value="មេដាយសុវត្ថារា">
                              មេដាយសុវត្ថារា
                           </Option>
                           <Option value="មេដាយមុនីសារាភ័ណ្ឌ">
                              មេដាយមុនីសារាភ័ណ្ឌ
                           </Option>
                           <Option value="មេដាយការងារ">មេដាយការងារ</Option>
                           <Option value="មេដាយស្ថាបនាជាតិ">
                              មេដាយស្ថាបនាជាតិ
                           </Option>
                           <Option value="មេដាយខេមរាកីឡារិទ្ធ">
                              មេដាយខេមរាកីឡារិទ្ធ
                           </Option>
                           <Option value="មេដាយស្រ្តីវឌ្ឍនា">
                              មេដាយស្រ្តីវឌ្ឍនា
                           </Option>
                        </Select>
                     </Form.Item>
                  </Col>
               </Row>
               {/* <Row gutter={16}>
                  <Col span={24}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="photo"
                        label="រូបភាពនៃការលើកសសើរ"
                        rules={[
                           {
                              required: true,
                              message: "សូមបំពេញរូបភាពនៃការលើកសសើរ",
                           },
                        ]}
                     >
                        <Input placeholder="រូបភាពនៃការលើកសសើរ" />
                     </Form.Item>
                  </Col>
               </Row> */}
            </Form>
         </Modal>
      </div>
   );
};

export default Praise;
