import { useState, useEffect } from "react";
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

const dataForm = {
   ក្រសួងមុខងារ: {
      ថ្នាក់កណ្តាល: {
         នាយកខុទ្ទកាល័យ: {},
         "អគ្គាធិការ នៃអគ្គាធិការដ្ឋាន": {
            ប្រធាននាយកដ្ឋានសវនកម្មផ្ទៃក្នុង: [],
         },
         អគ្គនាយកដ្ឋានរដ្ឋបាលនិងហិរញ្ញវត្ថុ: {
            "ប្រធាននាយកដ្ឋានរដ្ឋបាល និងសរុប": [
               "ការិយាល័យកិច្ចការរដ្ឋបាល",
               "ការិយាល័យសរុប",
               "ការិយាល័យតម្កល់ឯកសារនិងបណ្ណាល័យ",
               "ការិយាល័យពិធីការនិងបដិសណ្ឋារកិច្ច",
            ],
            ប្រធាននាយកដ្ឋានគ្រប់គ្រងបុគ្គលិក: [
               "ការិយាល័យរដ្ឋបាលនិងសរុប",
               "ការិយាល័យធនធានមនុស្ស",
               "ការិយាល័យក្របខ័ណ្ឌនិងបៀវត្ស",
               "ការិយាល័យបណ្តុះបណ្តាល",
            ],
            "ប្រធាននាយកដ្ឋានហិរញ្ញវត្ថុ និងផ្គត់ផ្គង់": [
               "ការិយាល័យរដ្ឋបាល",
               "ការិយាល័យផែនការនិងស្ថិតិ",
               "ការិយាល័យហិរញ្ញវត្ថុ",
               "ការិយាល័យគណនេយ្យនិងផ្គត់ផ្គង់",
            ],
            "ប្រធាននាយកដ្ឋានផែនការ និងស្ថិតិ": [],
         },
         អគ្គនាយកដ្ឋានគ្រប់គ្រងមុខងារសាធារណៈ: {
            "ប្រធាននាយកដ្ឋានរដ្ឋនិតិកម្ម និងវិវាទមុខងារសាធារណ": [
               "ការិយាល័យរដ្ឋបាល",
               "ការិយាល័យនិតិកម្ម",
               "ការិយាល័យផ្សព្វផ្សាយ",
               "ការិយាល័យវិវាទមុខងារសាធារណៈ",
            ],
            "ប្រធាននាយកដ្ឋានគ្រប់គ្រងក្របខណ្ខ:": [
               "ការិយាល័យធនធានមនុស្សនិងជំនាញឯកទេស",
               "ការិយាល័យក្របខ័ណ្ឌនិងវិភាគមុខងារ",
               "ការិយាល័យគ្រប់គ្រងក្របខ័ណ្ឌ មន្ត្រីជាប់កិច្ចសន្យា និងបុគ្គលិកអណ្តែត",
               "ការិយាល័យសម្របសម្រួលបណ្តុះបណ្តាល",
            ],
            "ប្រធាននាយកដ្ឋានត្រួតពិនិត្យរដ្ឋបាល និងការគ្រប់គ្រងមន្ត្រីរាជការសីុវិល":
               [
                  "ការិយាល័យត្រួតពិនិត្យនិងផ្ទៀងផ្ទាត់សលាកបត្យព័ត៌មានមន្ត្រីរាជការសីុវិល",
                  "ការិយាល័យត្រួតពិនិត្យរដ្ឋបាលនិងការគ្រប់គ្រងមន្ត្រីរាជការសីុវិល",
                  "ការិយាល័យត្រួតពិនិត្យផ្លាស់ប្តូរស្ថានភាពរដ្ឋបាលនិងគ្រួសារ",
                  "ការិយាល័យគ្រប់គ្រងការដំឡើងថ្នាក់និងឋានន្តរស័ក្តិ",
                  "ការិយាល័យគ្រប់គ្រងការតាំងស៊ប់និងដាក់អោយចុលនិវត្តន៍ជូនមន្ត្រីរាជការសីុវិល",
               ],
            "ប្រធាននាយកដ្ឋានគ្រប់គ្រងប្រព័ន្ធព័ត៌មានវិទ្យា និងឯកសារមន្រ្តីរាជការសីុវិល":
               [
                  "ការិយាល័យគ្រប់គ្រងនិងអភិវឌ្ឍប្រព័ន្ធព័ត៌មានវិទ្យា",
                  "ការិយាល័យប្រព័ន្ធបណ្តាញនិងគាំទ្របច្ចេកទេស",
                  "ការិយាល័យគ្រប់ក្រងគេហទំព័រ",
                  "ការិយាល័យគ្រប់គ្រងតារាងទូទាត់បៀវត្សតាមប្រព័ន្ធព័ត៌មានវិទ្យា",
                  "ការិយាល័យទិន្នន័យមន្ត្រីរាជការសីុវិលតាមប្រព័ន្ធព័ត៌មានវិទ្យា",
                  "ការិយាល័យឯកសារមន្ត្រីរាជការសីុវិល",
               ],
            "ប្រធាននាយកដ្ឋានធនធានអាស៊ានកម្ពុជា និងកិច្ចសហប្រតិបត្តិការអន្តរជាតិ":
               [
                  "ការិយាល័យទំនាក់ទំនងនិងពិធីការ",
                  "ការិយាល័យអាស៊ាន",
                  "ការិយាល័យសហប្រតិប្ត្តិការអន្តរជាតិ",
                  "ការិយាល័យទិន្នន័យមុខងារសាធារណៈ",
                  "ការិយាល័យស្រាវជ្រាវនិងនវានុវត្តន៍",
               ],
         },
         អគ្គនាយកដ្ឋានគោលនយោបាយមុខងារសាធារណៈ: {
            ប្រធាននាយកដ្ឋានសេវាសាធារណៈ: [
               "ការិយាល័យគោលនយោបាយសេវាសាធារណៈ",
               "ការិយាល័យព័ត៌មានសេវាសាធារណៈ",
               "ការិយាល័យសម្របសម្រួលការអនុវត្តការផ្តល់សេវាសាធារណៈ",
               "ការិយាល័យវាយតម្លៃស្តង់ដាសេវាសាធារណៈ",
               "ការិយាល័យព័ត៌មានត្រឡប់និងបណ្តឹងតវ៉ារបស់អ្នកប្រើប្រាស់សេវា",
            ],
            "ប្រធាននាយកដ្ឋានអភិវឌ្ឍន៍ធនធានមនុស្ស និងស្ថាប័ន": [
               "ការិយាល័យអភិវឌ្ឍន៍ធនធានមនុស្ស",
               "ការិយាល័យបណ្តុះបណ្តាល",
               "ការិយាល័យគ្រប់គ្រងធនធានមនុស្ស",
               "ការិយាល័យពង្រាយមន្ត្រីរាជការ",
               "ការិយាល័យពិនិត្យប្រតិបត្តិការឡើងវិញ",
               "ការិយាល័យស្រាវជ្រាវនិងអភិវឌ្ឍន៍",
            ],
            "ប្រធាននាយកដ្ឋានគោលនយោបាយលាភការ និងសមិទ្ធកម្ម": [
               "ការិយាល័យសិក្សាស្រាវជ្រាវ និងវិភាគប្រព័ន្ធលាភការ",
               "ការិយាល័យផ្សព្វផ្សាយគោលនយោលាភការនិងសមិទ្ធកម្ម",
               "ការិយាល័យសម្របសម្រួលជុំរុញអនុវត្តប្រព័ន្ធវាភការ",
               "ការិយាល័យសមិទ្ធកម្ម",
            ],
            ប្រធាននាយកដ្ឋានសម្របសម្រួលកែទម្រង់អន្តរវិស័យ: [
               "ការិយាល័យទំនាក់ទំនងជាមួយដៃគូអភិវឌ្ឍន៍",
               "ការិយាល័យព្រឹត្តប័ត្រព័ត៌មាននិងផ្សព្វផ្សាយ",
               "ការិយាល័យគ្រប់គ្រងគម្រោងហិរញប្បទាន",
               "ការិយាល័យទំនាក់ទំនងជាមួយកំណែទម្រង់ការគ្រប់គ្រងហិរញ្ញវត្ថុសាធារណៈ",
               "ការិយាល័យទំនាក់ទំនងជាមួយកំណែទម្រង់វិមជ្ឈការនិងវិសហមជ្ឈការ",
            ],
            "ប្រធាននាយកដ្ឋានត្រួតពិនិត្យ និងវាយតម្លៃ": [
               "ការិយាល័យសិក្សាស្រាវជ្រាវ",
               "ការិយាល័យសម្របសម្រួលនិងជំរុញការអនុវត្ត",
               "ការិយាល័យត្រួតពិនិត្យនិងវេយតម្លៃការអនុវត្តគោលនយោបាយ",
               "ការិយាល័យបូកសរុបនិងវិភាគទិន្នន័យ",
            ],
         },
         សាលាភូមិន្ទរដ្ឋបាល: {
            "ប្រធាននាយកដ្ឋានរដ្ឋបាល និហិរញ្ញវត្ថុ": [],
            ប្រធាននាយកដ្ឋានស្រាវជ្រាវនិងទំនាក់ទំនងអន្តរជាតិ: [],
            ប្រធាននាយកដ្ឋានបណ្តុះបណ្តាលដំបូង: [],
            ប្រធាននាយកដ្ឋានបណ្តុះបណ្តាលបន្ត: [],
            ប្រធាននាយកដ្ឋានសវនកម្មផ្ទៃក្នុង: [
               "ការិយាល័យសវនកម្មទី១",
               "ការិយាល័យសវនកម្មទី២",
               "ការិយាល័យសវនកម្មទី៣",
            ],
            "អគ្គាធិការ នៃអគ្គាធិការដ្ឋាន": [
               "ការិយាល័យរដ្ឋបាល",
               "ការិយាល័យអធិការកិច្ចមុខងារសាធារណៈ",
               "ការិយាល័យអធិការកិច្ចរដ្ឋបាលនិងហិរញ្ញវត្ថុ",
            ],
         },
      },

      ថ្នាក់ក្រោមជាតិ: {
         មន្ទីរមុខងារសាធារណៈរាជធានីខេត្ត: {},
      },
   },
   ក្រសួងយុត្តិធម៌: {
      ថ្នាក់កណ្តាល: {},
      ថ្នាក់ក្រោមជាតិ: {},
   },
};
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

const WorkHistory = ({ userData, ministryStructure }) => {
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
      // {
      //    title: "ខ្លឹមសារផ្សេងៗ",
      //    key: "action",
      //    render: (text, record) => (
      //       // <Space size="middle">
      //       //    <Button
      //       //       icon={<EditOutlined />}
      //       //       onClick={() => onEdit(record.refNumber)}
      //       //    >
      //       //       Edit
      //       //    </Button>
      //       //    <Button
      //       //       danger
      //       //       icon={<DeleteOutlined />}
      //       //       onClick={() => onDelete(record.refNumber)}
      //       //    >
      //       //       Delete
      //       //    </Button>
      //       // </Space>
      //       <Dropdown overlay={() => actionMenu(record)}>
      //          <a
      //             className="ant-dropdown-link"
      //             onClick={(e) => e.preventDefault()}
      //          >
      //             ផ្សេងៗ <DownOutlined />
      //          </a>
      //       </Dropdown>
      //    ),
      // },
   ];
   // useEffect(() => {
   //    if(visible === false){
   //       setEditData(null)
   //    }
   //    form.resetFields()
   // }, [visible])

   return (
      <div style={{ paddingTop: 10 }}>
         {/* <Button icon={<PlusOutlined />} onClick={showDrawer}>
        បញ្ចូលមុខតំណែង
      </Button> */}
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
         <div>
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
                        name="ក្រសួង-ស្ថាប័ន"
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

export default WorkHistory;
