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

const provincesData = [
   "ខេត្តបន្ទាយមានជ័យ",
   "ខេត្តបាត់ដំបង",
   "ខេត្តកំពង់ចាម",
   "ខេត្តកំពង់ឆ្នាំង",
   "ខេត្តកំពង់ស្ពឺ",
   "ខេត្តកំពង់ធំ",
   "ខេត្តកំពត",
   "ខេត្តកណ្ដាល",
   "ខេត្តកោះកុង",
   "ខេត្តក្រចេះ",
   "ខេត្តមណ្ឌលគិរី",
   "ខេត្តព្រះវិហារ",
   "ខេត្តព្រៃវែង",
   "ខេត្តពោធិ៍សាត់",
   "ខេត្តរតនគិរី",
   "ខេត្តសៀមរាប",
   "ខេត្តព្រះសីហនុ",
   "ខេត្តស្ទឹងត្រែង",
   "ខេត្តស្វាយរៀង",
   "ខេត្តតាកែវ",
   "ខេត្តឧត្ដរមានជ័យ",
   "ខេត្តកែប",
   "ខេត្តប៉ៃលិន",
   "ខេត្តត្បូងឃ្មុំ",
];

const workHistoryInfo = ({ userData, ministryStructure }) => {
   const [form] = Form.useForm();
   const [visible, setVisible] = useState(false);
   const [startDate, setStartDate] = useState();
   const [endDate, setEndDate] = useState();
   const [nowOption, setNowOption] = useState(true);
   const [experiencesList, setExperiencesList] = useState([
      ...userData.experience,
   ]);

   const [choiceMinistry, setChoiceMinistry] = useState("");
   const [choiceInstitution, setChoiceInstitution] = useState("");
   const [choiceUnit, setChoiceUnit] = useState("");
   const [choiceDepartment, setChoiceDepartment] = useState("");

   console.log(experiencesList);

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
         const res = await api.put(`/api/users/${userData.id}`, {
            experience: [...experiencesList, dataInput],
         });
         setVisible(false);
         setExperiencesList([...res.data.data.experience]);
         form.resetFields();
      });
   };

   const onEdit = (id, e) => {
      e.preventDefault();
      console.log("Edit " + id);
   };

   const onDelete = (id, e) => {
      e.preventDefault();
      console.log("Delete " + id);
   };

   const actionMenu = (record) => {
      return (
         <Menu>
            <Menu.Item key="0" icon={<EditOutlined />}>
               <a onClick={(e) => onEdit(record.refNum, e)}>Edit</a>
            </Menu.Item>
            <Menu.Item key="1" icon={<DeleteOutlined />}>
               <a onClick={(e) => onDelete(record.refNum, e)}>Delete</a>
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
         render: (text) => (text ? text : "បច្ចុប្បន្ន"),
      },
      {
         title: "កំណត់សំគាល់",
         dataIndex: "note",
         key: "note",
      },
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
   // useEffect(() => {
   //    if(visible === false){
   //       setEditData(null)
   //    }
   //    form.resetFields()
   // }, [visible])

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
            <Form layout="vertical" hideRequiredMark form={form}>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="លេខលិខិតយោង"
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
                        name="refNum"
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
                              message: "សូមជ្រើសរើសក្រសួង-ស្ថាប័ន",
                           },
                        ]}
                     >
                        <Select
                           placeholder="ជ្រើសរើស"
                           onChange={(v) => {
                              // console.log(form.getFieldValue("ប្រភេទស្ថាប័ន"));
                              form.resetFields([
                                 "ប្រភេទស្ថាប័ន",
                                 "អង្គភាព",
                                 "នាយកដ្ឋាន",
                                 "ការិយាល័យ",
                                 "កន្លែងធ្វើការរាជធានី៊​/ខេត្ត",
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
                        <Select
                           placeholder="ជ្រើសរើស"
                           onChange={(v) => {
                              form.resetFields([
                                 "អង្គភាព",
                                 "នាយកដ្ឋាន",
                                 "ការិយាល័យ",
                                 "កន្លែងធ្វើការរាជធានី៊​/ខេត្ត",
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
                        <Input placeholder="មុខតំណែង" />
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
                              message: "សូមជ្រើសរើសអង្គភាព",
                           },
                        ]}
                     >
                        <Select
                           placeholder="ជ្រើសរើស"
                           onChange={(v) => {
                              form.resetFields(["នាយកដ្ឋាន", "ការិយាល័យ"]);
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
                                 form.resetFields(["ការិយាល័យ"]);
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
                        name="ការិយាល័យ"
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
                        disabled
                        name="កន្លែងធ្វើការរាជធានី៊​/ខេត្ត"
                        label="កន្លែងធ្វើការរាជធានី៊​/ខេត្ត"
                        rules={[
                           {
                              required:
                                 choiceInstitution === "ថ្នាក់កណ្តាល"
                                    ? false
                                    : true,
                              message:
                                 "សូមជ្រើសរើសកន្លែងធ្វើការរាជធានី៊​/ខេត្ត",
                           },
                        ]}
                     >
                        <Select
                           placeholder="ជ្រើសរើស"
                           disabled={
                              choiceInstitution === "ថ្នាក់កណ្តាល"
                                 ? true
                                 : false
                           }
                        >
                           {provincesData.map((v, i) => (
                              <Option value={v} key={i}>
                                 {v}
                              </Option>
                           ))}
                        </Select>
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="កន្លែងធ្វើការស្រុក/ខណ្ឌ"
                        label="កន្លែងធ្វើការស្រុក/ខណ្ឌ"
                        rules={[
                           {
                              required:
                                 choiceInstitution === "ថ្នាក់កណ្តាល"
                                    ? false
                                    : true,
                              message: "សូមជ្រើសរើសកន្លែងធ្វើការស្រុក/ខណ្ឌ",
                           },
                        ]}
                     >
                        <Input
                           placeholder="ស្រុក/ខណ្ឌ"
                           disabled={
                              choiceInstitution === "ថ្នាក់កណ្តាល"
                                 ? true
                                 : false
                           }
                        />
                     </Form.Item>
                  </Col>
                  <Col span={8}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name="កន្លែងធ្វើការឃុំ/សង្កាត់"
                        label="កន្លែងធ្វើការឃុំ/សង្កាត់"
                        rules={[
                           {
                              required:
                                 choiceInstitution === "ថ្នាក់កណ្តាល"
                                    ? false
                                    : true,
                              message: "សូមជ្រើសរើសកន្លែងធ្វើការឃុំ/សង្កាត់",
                           },
                        ]}
                     >
                        <Input
                           placeholder="ឃុំ/សង្កាត់"
                           disabled={
                              choiceInstitution === "ថ្នាក់កណ្តាល"
                                 ? true
                                 : false
                           }
                        />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={24}>
                  <Col span={8}>
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
                        label="កាលបរិច្ឆេទបញ្ចប់"
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