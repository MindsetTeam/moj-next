import styles from "@/styles/Edit.module.css";
import { AlertDispatch } from "contexts/alert.context";
import { UserOutlined, PhoneOutlined } from "@ant-design/icons";
import { useState, useContext } from "react";

import { Col, Row, Form, Input, DatePicker, Radio, Select, Button } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import api from "@/utils/api";
import moment from "moment";
const statusOptions = [
   { label: "រស់", value: "រស់" },
   { label: "ស្លាប់", value: "ស្លាប់" },
];

const ParentInfo = ({ userData }) => {
   const dispatch = useContext(AlertDispatch);
   const [dadForm] = Form.useForm();
   const [momForm] = Form.useForm();
   const [dadInfo, setDadInfo] = useState(null);
   const [momInfo, setMomInfo] = useState(null);

   const onSave = () => {
      const dadDataInput = dadForm.getFieldsValue(true);
      const momDataInput = momForm.getFieldsValue(true);
      dadForm.validateFields();
      momForm.validateFields();
      Promise.all([dadForm.validateFields(), momForm.validateFields()]).then(
         async () => {
            const res = await api.put(`/api/users/${userData.id}`, {
               ...dadDataInput,
               ...momDataInput,
            });

            dispatch({
               type: "SUCCESS",
               payload: {
                  message: "បានរក្សាទុក",
                  //  description: "បានរក្សាទុក",
               },
            });
         }
      );
   };

   return (
      <div>
         <Row gutter={18}>
            <Col span={12}>
               {/* Father Info */}
               <div className={styles.dadInfoContainer}>
                  <h1 className={styles.title}>
                     <UserOutlined></UserOutlined>ព័ត៌មានឪពុក
                  </h1>
                  <Form
                     layout="vertical"
                     hideRequiredMark
                     form={dadForm}
                     initialValues={{
                        fatherInfo: {
                           ...userData?.fatherInfo,
                           birthDate: userData?.fatherInfo?.birthDate
                              ? moment(userData.fatherInfo.birthDate)
                              : null,
                        },
                     }}
                  >
                     <Row gutter={16}>
                        <Col span={24}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["fatherInfo", "nationalityIDNum"]}
                              label="លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message:
                              //          "សូមបំពេញលេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ",
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
                              name={["fatherInfo", "fullName"]}
                              label="គោត្តនាម និងនាម"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញគោត្តនាម និងនាម",
                              //    },
                              // ]}
                           >
                              <Input placeholder="គោត្តនាម និងនាម" />
                           </Form.Item>
                        </Col>
                        <Col span={12}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["fatherInfo", "fullNameLatin"]}
                              label="គោត្តនាម និងនាមឡាតាំង"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញគោត្តនាម និងនាមឡាតាំង",
                              //    },
                              // ]}
                           >
                              <Input placeholder="គោត្តនាម និងនាមឡាតាំង" />
                           </Form.Item>
                        </Col>
                     </Row>
                     <Row gutter={16}>
                        <Col span={8}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["fatherInfo", "birthDate"]}
                              label="ថ្ងៃខែឆ្នាំកំណើត"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញថ្ងៃខែឆ្នាំកំណើត",
                              //    },
                              // ]}
                           >
                              <DatePicker
                                 placeholder="ថ្ងៃខែឆ្នាំកំណើត"
                                 style={{ width: "100%" }}
                                 format="DD/MM/YYYY"
                                 //  onChange={onStartDateChange}
                              />
                           </Form.Item>
                        </Col>
                        <Col span={8}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["fatherInfo", "nationality"]}
                              label="ជនជាតិ"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញជនជាតិ",
                              //    },
                              // ]}
                           >
                              <Input placeholder="ជនជាតិ" />
                           </Form.Item>
                        </Col>
                        <Col span={8}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["fatherInfo", "ethnicity"]}
                              label="សញ្ជាតិ"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញសញ្ជាតិ",
                              //    },
                              // ]}
                           >
                              <Input placeholder="សញ្ជាតិ" />
                           </Form.Item>
                        </Col>
                     </Row>
                     <Row gutter={16}>
                        <Col span={12}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["fatherInfo", "livingStatus"]}
                              label="ស្ថានភាព"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមជ្រើសរើសស្ថានភាព",
                              //    },
                              // ]}
                           >
                              <Radio.Group
                                 options={statusOptions}
                              ></Radio.Group>
                           </Form.Item>
                        </Col>
                        <Col span={12}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["fatherInfo", "occupation"]}
                              label="មុខរបរ"
                           >
                              <Input placeholder="មុខរបរ" />
                           </Form.Item>
                        </Col>
                     </Row>
                     <h1 className={styles.title} style={{ marginTop: 20 }}>
                        <UserOutlined></UserOutlined>ទីកន្លែងកំណើត
                     </h1>
                     <Row gutter={16}>
                        <Col span={12}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["fatherInfo", "birthPlace", "village"]}
                              label="ភូមិ"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញភូមិ",
                              //    },
                              // ]}
                           >
                              <Input placeholder="ភូមិ" />
                           </Form.Item>
                        </Col>
                        <Col span={12}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["fatherInfo", "birthPlace", "commune"]}
                              label="ឃុំ/សង្កាត់"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញឃុំ/សង្កាត់",
                              //    },
                              // ]}
                           >
                              <Input placeholder="ឃុំ/សង្កាត់" />
                           </Form.Item>
                        </Col>
                     </Row>
                     <Row gutter={16}>
                        <Col span={12}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["fatherInfo", "birthPlace", "district"]}
                              label="ស្រុក/ខណ្ឌ"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញស្រុក/ខណ្ឌ",
                              //    },
                              // ]}
                           >
                              <Input placeholder="ស្រុក/ខណ្ឌ" />
                           </Form.Item>
                        </Col>

                        <Col span={12}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["fatherInfo", "birthPlace", "province"]}
                              label="រាជធានី/ខេត្ត"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញរាជធានី/ខេត្ត",
                              //    },
                              // ]}
                           >
                              <Input placeholder="រាជធានី/ខេត្ត" />
                           </Form.Item>
                        </Col>
                     </Row>

                     <h1 className={styles.title} style={{ marginTop: 20 }}>
                        <PhoneOutlined></PhoneOutlined>ទំនាក់ទំនង
                     </h1>
                     <Row gutter={16}>
                        <Col span={24}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["fatherInfo", "phoneNumber"]}
                              label="លេខទូរស័ព្ទ"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញលេខទូរស័ព្ទ",
                              //    },
                              // ]}
                           >
                              <Input placeholder="លេខទូរស័ព្ទ" />
                           </Form.Item>
                        </Col>
                     </Row>
                  </Form>
               </div>
            </Col>
            <Col span={12}>
               {/* Mother Info */}
               <div className={styles.momInfoContainer}>
                  <h1 className={styles.title}>
                     <UserOutlined></UserOutlined>ព័ត៌មានម្តាយ
                  </h1>
                  <Form
                     layout="vertical"
                     hideRequiredMark
                     form={momForm}
                     initialValues={{
                        motherInfo: {
                           ...userData?.motherInfo,
                           birthDate: userData?.motherInfo?.birthDate
                              ? moment(userData.motherInfo.birthDate)
                              : null,
                        },
                     }}
                  >
                     <Row gutter={16}>
                        <Col span={24}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["motherInfo", "nationalityIDNum"]}
                              label="លេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message:
                              //          "សូមបំពេញលេខអត្តសញ្ញាណប័ណ្ណសញ្ជាតិខ្មែរ",
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
                              name={["motherInfo", "fullName"]}
                              label="គោត្តនាម និងនាម"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញគោត្តនាម និងនាម",
                              //    },
                              // ]}
                           >
                              <Input placeholder="គោត្តនាម និងនាម" />
                           </Form.Item>
                        </Col>
                        <Col span={12}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["motherInfo", "fullNameLatin"]}
                              label="គោត្តនាម និងនាមឡាតាំង"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញគោត្តនាម និងនាមឡាតាំង",
                              //    },
                              // ]}
                           >
                              <Input placeholder="គោត្តនាម និងនាមឡាតាំង" />
                           </Form.Item>
                        </Col>
                     </Row>
                     <Row gutter={16}>
                        <Col span={8}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["motherInfo", "birthDate"]}
                              label="ថ្ងៃខែឆ្នាំកំណើត"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញថ្ងៃខែឆ្នាំកំណើត",
                              //    },
                              // ]}
                           >
                              <DatePicker
                                 placeholder="ថ្ងៃខែឆ្នាំកំណើត"
                                 style={{ width: "100%" }}
                                 format="DD/MM/YYYY"
                                 //  onChange={onStartDateChange}
                              />
                           </Form.Item>
                        </Col>
                        <Col span={8}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["motherInfo", "nationality"]}
                              label="ជនជាតិ"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញជនជាតិ",
                              //    },
                              // ]}
                           >
                              <Input placeholder="ជនជាតិ" />
                           </Form.Item>
                        </Col>
                        <Col span={8}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["motherInfo", "ethnicity"]}
                              label="សញ្ជាតិ"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញសញ្ជាតិ",
                              //    },
                              // ]}
                           >
                              <Input placeholder="សញ្ជាតិ" />
                           </Form.Item>
                        </Col>
                     </Row>
                     <Row gutter={16}>
                        <Col span={12}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["motherInfo", "livingStatus"]}
                              label="ស្ថានភាព"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមជ្រើសរើសស្ថានភាព",
                              //    },
                              // ]}
                           >
                              <Radio.Group
                                 options={statusOptions}
                              ></Radio.Group>
                           </Form.Item>
                        </Col>
                        <Col span={12}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["motherInfo", "occupation"]}
                              label="មុខរបរ"
                           >
                              <Input placeholder="មុខរបរ" />
                           </Form.Item>
                        </Col>
                     </Row>
                     <h1 className={styles.title} style={{ marginTop: 20 }}>
                        <UserOutlined></UserOutlined>ទីកន្លែងកំណើត
                     </h1>
                     <Row gutter={16}>
                        <Col span={12}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["motherInfo", "birthPlace", "village"]}
                              label="ភូមិ"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញភូមិ",
                              //    },
                              // ]}
                           >
                              <Input placeholder="ភូមិ" />
                           </Form.Item>
                        </Col>
                        <Col span={12}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["motherInfo", "birthPlace", "commune"]}
                              label="ឃុំ/សង្កាត់"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញឃុំ/សង្កាត់",
                              //    },
                              // ]}
                           >
                              <Input placeholder="ឃុំ/សង្កាត់" />
                           </Form.Item>
                        </Col>
                     </Row>
                     <Row gutter={16}>
                        <Col span={12}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["motherInfo", "birthPlace", "district"]}
                              label="ស្រុក/ខណ្ឌ"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញស្រុក/ខណ្ឌ",
                              //    },
                              // ]}
                           >
                              <Input placeholder="ស្រុក/ខណ្ឌ" />
                           </Form.Item>
                        </Col>
                        <Col span={12}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["motherInfo", "birthPlace", "province"]}
                              label="រាជធានី/ខេត្ត"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញរាជធានី/ខេត្ត",
                              //    },
                              // ]}
                           >
                              <Input placeholder="រាជធានី/ខេត្ត" />
                           </Form.Item>
                        </Col>
                     </Row>

                     <h1 className={styles.title} style={{ marginTop: 20 }}>
                        <PhoneOutlined></PhoneOutlined>ទំនាក់ទំនង
                     </h1>
                     <Row gutter={16}>
                        <Col span={24}>
                           <Form.Item
                              style={{ marginBottom: 10 }}
                              name={["motherInfo", "phoneNumber"]}
                              label="លេខទូរស័ព្ទ"
                              // rules={[
                              //    {
                              //       required: true,
                              //       message: "សូមបំពេញលេខទូរស័ព្ទ",
                              //    },
                              // ]}
                           >
                              <Input placeholder="លេខទូរស័ព្ទ" />
                           </Form.Item>
                        </Col>
                     </Row>
                  </Form>
               </div>
            </Col>
         </Row>
         <div className={styles.btnContainer}>
            <Button icon={<SaveOutlined />} onClick={onSave}>
               រក្សាទុក
            </Button>
         </div>
      </div>
   );
};

export default ParentInfo;
