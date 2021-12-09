import { useState, useEffect } from "react";
import styles from "@/styles/Employee.module.css";
import moment from "moment";

import {
   Form,
   Button,
   Col,
   Row,
   Input,
   Select,
   DatePicker,
   Table,
   Switch,
   Menu,
   Dropdown,
   Modal,
} from "antd";
import {
   PlusOutlined,
   EditOutlined,
   DeleteOutlined,
   DownOutlined,
} from "@ant-design/icons";
import api from "@/utils/api";

const { Option } = Select;

const workHistoryInfo = ({
   userData,
   ministryStructure,
   provincesList,
   positionList,
}) => {
   const [form] = Form.useForm();
   const [visible, setVisible] = useState(false);
   const [startDate, setStartDate] = useState();
   const [endDate, setEndDate] = useState();
   const [nowOption, setNowOption] = useState(true);
   const [experiencesList, setExperiencesList] = useState([
      ...userData.experience,
   ]);
   const [editData, setEditData] = useState(null);

   const [choiceMinistry, setChoiceMinistry] = useState("ក្រសួងយុត្តិធម៌");
   const [choiceInstitution, setChoiceInstitution] = useState("");
   const [choiceUnit, setChoiceUnit] = useState("");
   const [choiceDepartment, setChoiceDepartment] = useState("");

   //   console.log(experiencesList);

   const onStartDateChange = (date, dateString) => {
      //  console.log(date);
      setStartDate(dateString);
      console.log(dateString);
   };

   const onEndDateChange = (date, dateString) => {
      //  console.log(date);
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
               experience: experiencesList.map((v) =>
                  v._id === editData._id ? dataInput : v
               ),
            };
         } else {
            updateData = { experience: [...experiencesList, dataInput] };
         }

         const res = await api.put(`/api/users/${userData.id}`, updateData);
         setVisible(false);
         setExperiencesList([...res.data.data.experience]);
         form.resetFields();
      });
   };

   const onEdit = (record) => {
      //  e.preventDefault();
      setEditData(record);
      setVisible(true);
      //  console.log("Edit " + id);
   };

   const onDelete = async (record) => {
      let res = await api.put(`/api/users/${userData.id}`, {
         experience: experiencesList.filter((v) => v._id !== record._id),
      });
      setExperiencesList(res.data.data.experience);
   };

   const actionMenu = (record) => {
      return (
         <Menu>
            <Menu.Item key="0" icon={<EditOutlined />}>
               <a onClick={() => onEdit(record)}>Edit</a>
            </Menu.Item>
            <Menu.Item key="1" icon={<DeleteOutlined />}>
               <a onClick={() => onDelete(record)}>Delete</a>
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
         title: "មុខតំណែង",
         dataIndex: "position",
         key: "position",
      },
      {
         title: "អង្គភាព",
         dataIndex: "unit",
         key: "unit",
      },
      {
         title: "ថ្ងៃខែឆ្នាំចុះហត្ថលេខា",
         dataIndex: "startDate",
         key: "startDate",
         render: (text) => moment(text).local(true).format("DD/MM/YYYY"),
      },
      {
         title: "ថ្ងៃខែឆ្នាំបញ្ចប់",
         dataIndex: "endDate",
         key: "endDate",
         render: (text) =>
            text
               ? moment(text).local(true).format("DD/MM/YYYY")
               : "បច្ចុប្បន្ន",
      },
      //  {
      //    title: "កំណត់សំគាល់",
      //    dataIndex: "note",
      //    key: "note",
      //  },
      {
         title: "ខ្លឹមសារផ្សេងៗ",
         key: "action",
         render: (text, record) => (
            // <Space size="middle">
            //    <Button
            //       icon={<EditOutlined />}
            //       onClick={() => onEdit(record.refNumber)}
            //    >
            //       Edit
            //    </Button>
            //    <Button
            //       danger
            //       icon={<DeleteOutlined />}
            //       onClick={() => onDelete(record.refNumber)}
            //    >
            //       Delete
            //    </Button>
            // </Space>
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
   useEffect(() => {
      if (visible === false) {
         setEditData(null);
      }
      form.resetFields();
   }, [visible]);

   return (
      <div className={styles.workHistoryInfoContainer}>
         <Button icon={<PlusOutlined />} onClick={showDrawer}>
            បញ្ចូលមុខតំណែង
         </Button>
         {/* <Button
        icon={<PrinterOutlined />}
        style={{ marginLeft: 10 }}
        onClick={() => {
          const mywindow = window.open("", "PRINT", "");

          mywindow.document.write(
            "<html><head><title>" +
              document.title +
              "</title><style>table{ border-collapse: collapse;}</style>"
          );
          mywindow.document.write("</head><body >");
          mywindow.document.write(
            document.getElementById("elmenttesting").innerHTML
          );
          mywindow.document.write("</body></html>");

          mywindow.print();
          mywindow.close();
        }}
      >
        បោះពុម្ព
      </Button> */}
         <div id="elmenttesting" style={{ display: "none" }}>
            <h1>1. Experiences</h1>
            <ul>
               <li>adfad</li>
               <li>adfad</li>
            </ul>
            <table border="1" style={{ width: "100%", borderCollapse: true }}>
               <tr>
                  <th>Sign Date</th>
                  <th>End Date</th>
                  <th>Position</th>
                  <th>Unit</th>
                  <th>Ref Number</th>
               </tr>
               {experiencesList.map((v) => {
                  return (
                     <tr key={v._id}>
                        <td>{v.signDate}</td>
                        <td>{v.endDate}</td>
                        <td>{v.position}</td>
                        <td>{v.unit}</td>
                        <td>{v.refNumber}</td>
                     </tr>
                  );
               })}
            </table>
         </div>
         <div style={{ marginTop: 20 }}>
            <Table columns={columns} dataSource={experiencesList}></Table>
         </div>

         {/* Modal */}
         <Modal
            title="បញ្ចូលមុខតំណែង"
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
                  <Button onClick={onClose} style={{ marginRight: 8 }} danger>
                     Cancel
                  </Button>
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
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="refNum"
                        label="លេខលិខិតយោង"
                        // rules={[
                        //   {
                        //     required: true,
                        //     message: "សូមបំពេញលេខលិខិតយោង",
                        //   },
                        // ]}
                     >
                        <Input placeholder="លេខលិខិតយោង" />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     {/* <Form.Item
                        name="url"
                        label="Url"
                        rules={[
                           { required: true, message: "Please enter url" },
                        ]}
                     >
                        <Input
                           style={{ width: "100%" }}
                           addonBefore="http://"
                           addonAfter=".com"
                           placeholder="Please enter url"
                        />
                     </Form.Item> */}
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="refType"
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
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="ministry"
                        label="ក្រសួង-ស្ថាប័ន"
                        rules={[
                           {
                              required: true,
                              message: "សូមបំពេញក្រសួង-ស្ថាប័ន",
                           },
                        ]}
                        initialValue={"ក្រសួងយុត្តិធម៌"}
                     >
                        {/* <Input placeholder="ក្រសួង-ស្ថាប័ន" /> */}
                        {/* <Select
                           placeholder="ជ្រើសរើស"
                           onChange={(v) => {
                              // console.log(form.getFieldValue("ប្រភេទស្ថាប័ន"));
                              form.resetFields([
                                 "institution",
                                 "unit",
                                 "department",
                                 "office",
                                 "provinces",
                              ]);
                              setChoiceMinistry(v);
                              setChoiceInstitution("");
                              setChoiceUnit("");
                              setChoiceDepartment("");
                           }}
                        >
                           {Object.keys(ministryStructure).map((v, i) => {
                              return (
                                 <Option key={i} value={v}>
                                    {v}
                                 </Option>
                              );
                           })}
                        </Select> */}
                        <Select
                           placeholder="ជ្រើសរើស"
                        >
                           <Option value="ក្រសួងយុត្តិធម៌">
                              ក្រសួងយុត្តិធម៌
                           </Option>
                        </Select>
                     </Form.Item>
                  </Col>
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="institution"
                        label="ប្រភេទស្ថាប័ន"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសប្រភេទស្ថាប័ន",
                           },
                        ]}
                     >
                        {/* <Input placeholder="ប្រភេទស្ថាប័ន" /> */}
                        <Select
                           placeholder="ជ្រើសរើស"
                           onChange={(v) => {
                              form.resetFields([
                                 "unit",
                                 "department",
                                 "office",
                                 "provinces",
                              ]);
                              setChoiceInstitution(v);
                              setChoiceUnit("");
                              setChoiceDepartment("");
                           }}
                        >
                           {choiceMinistry &&
                              Object.keys(
                                 ministryStructure[choiceMinistry]
                              ).map((v, i) => {
                                 return (
                                    <Option key={i} value={v}>
                                       {v}
                                    </Option>
                                 );
                              })}
                        </Select>
                     </Form.Item>
                     {/* <Form.Item
                        name="type"
                        label="Type"
                        rules={[
                           {
                              required: true,
                              message: "Please choose the type",
                           },
                        ]}
                     >
                        <Select placeholder="Please choose the type">
                           <Option value="private">Private</Option>
                           <Option value="public">Public</Option>
                        </Select>
                     </Form.Item> */}
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="position"
                        label="មុខតំណែង"
                        rules={[
                           {
                              required: true,
                              message: "សូមបំពេញមុខតំណែង",
                           },
                        ]}
                     >
                        {/* <Input placeholder="មុខតំណែង" /> */}
                        <Select placeholder="ជ្រើសរើស">
                           {positionList.map((v) => (
                              <Option value={v}>{v}</Option>
                           ))}
                        </Select>
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={24}>
                  <Col span={8}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="unit"
                        label="អង្គភាព"
                        rules={[
                           {
                              required: true,
                              message: "សូមបំពេញអង្គភាព",
                           },
                        ]}
                     >
                        {/* <Input placeholder="អង្គភាព" /> */}
                        <Select
                           placeholder="ជ្រើសរើស"
                           onChange={(v) => {
                              form.resetFields(["department", "office"]);
                              setChoiceUnit(v);
                              setChoiceDepartment("");
                           }}
                        >
                           {choiceInstitution &&
                              Object.keys(
                                 ministryStructure[choiceMinistry][
                                    choiceInstitution
                                 ]
                              ).map((v, i) => (
                                 <Option key={i} value={v}>
                                    {v}
                                 </Option>
                              ))}
                        </Select>
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="department"
                        label="នាយកដ្ឋាន"
                        rules={[
                           {
                              required: false,
                              message: "សូមជ្រើសរើសនាយកដ្ឋាន",
                           },
                        ]}
                     >
                        {choiceInstitution !== "ថ្នាក់កណ្តាល" ? (
                           <Input placeholder="នាយកដ្ឋាន" />
                        ) : (
                           <Select
                              placeholder="ជ្រើសរើស"
                              onChange={(v) => {
                                 form.resetFields(["office"]);
                                 setChoiceDepartment(v);
                              }}
                           >
                              {choiceUnit &&
                                 Object.keys(
                                    ministryStructure[choiceMinistry][
                                       choiceInstitution
                                    ][choiceUnit]
                                 ).map((v) => <Option value={v}>{v}</Option>)}
                           </Select>
                        )}
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="office"
                        label="ការិយាល័យ"
                        rules={[
                           {
                              required: false,
                              message: "សូមជ្រើសរើសការិយាល័យ",
                           },
                        ]}
                     >
                        {choiceInstitution !== "ថ្នាក់កណ្តាល" ? (
                           <Input placeholder="ការិយាល័យ" />
                        ) : (
                           <Select placeholder="ជ្រើសរើស" onChange={() => {}}>
                              {choiceDepartment &&
                                 ministryStructure[choiceMinistry][
                                    choiceInstitution
                                 ][choiceUnit][choiceDepartment].map((v, i) => {
                                    return (
                                       <Option key={i} value={v}>
                                          {" "}
                                          {v}
                                       </Option>
                                    );
                                 })}{" "}
                           </Select>
                        )}
                     </Form.Item>
                  </Col>
               </Row>

               <Row gutter={24}>
                  <Col span={8}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="startDate"
                        label="ថ្ងៃខែឆ្នាំចូលបំពេញការងារ"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសថ្ងៃខែឆ្នាំចូលបំពេញការងារ",
                           },
                        ]}
                     >
                        <DatePicker
                           style={{ width: "100%" }}
                           format="DD/MM/YYYY"
                           onChange={onStartDateChange}
                        />
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item label="បច្ចុប្បន្ន">
                        <Switch defaultChecked onChange={onNowChange}></Switch>
                     </Form.Item>
                  </Col>
                  <Col span={8} pull={5}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="endDate"
                        label="ថ្ងៃខែឆ្នាំបញ្ចប់"
                        // rules={[
                        //   { required: true, message: "សូមជ្រើសរើសកាលបរិច្ឆេទបញ្ចប់" },
                        // ]}
                     >
                        <DatePicker
                           disabled={nowOption}
                           format="DD/MM/YYYY"
                           style={{ width: "100%" }}
                           onChange={onEndDateChange}
                        />
                     </Form.Item>
                  </Col>
               </Row>
            </Form>
         </Modal>
      </div>
   );
};

export default workHistoryInfo;
