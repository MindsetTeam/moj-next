import styles from "@/styles/Edit.module.css";
import { AlertDispatch } from "contexts/alert.context";
import { UserOutlined, SaveOutlined, UploadOutlined } from "@ant-design/icons";
import { useState, useContext } from "react";

import ChildrenInfo from "@/components/v1/Edit/childrenInfo";

import { Col, Row, Form, Input, DatePicker, Radio, Button, Upload } from "antd";
import api from "@/utils/api";
import moment from "moment";

const status = [
   { label: "រស់", value: "រស់" },
   { label: "ស្លាប់", value: "ស្លាប់" },
];

const SpouseInfo = ({ userData, onChangeTabKey, familyStatusInfo }) => {
   const dispatch = useContext(AlertDispatch);
   const [form] = Form.useForm();
   const [spouseInfo, setSpouseInfo] = useState(null);
   // const [isSingle, setIsSingle] = useState(familyStatusInfo ==="នៅលីវ");

   const onSave = () => {
      const dataInput = form.getFieldsValue(true);
      form.validateFields().then(async () => {
         const res = await api.put(`/api/users/${userData.id}`, dataInput);

         dispatch({
            type: "SUCCESS",
            payload: {
               message: "បានរក្សាទុក",
               //  description: "បានរក្សាទុក",
            },
         });
         onChangeTabKey("3");
      });
   };

   const isSingleToggle = () => {
      setIsSingle(!isSingle);
   };

   return (
      <div>
         <Form
            layout="vertical"
            hideRequiredMark
            form={form}
            initialValues={{
               partnerInfo: {
                  ...userData?.partnerInfo,
                  birthDate: userData?.partnerInfo?.birthDate
                     ? moment(userData.partnerInfo.birthDate)
                     : null,
               },
            }}
         >
            {/* Spouse Info */}
            <div className={styles.spouseInfoContainer}>
               <h1 className={styles.title}>
                  <UserOutlined></UserOutlined>ព័ត៌មានទូទៅ
               </h1>
               {/* <Row gutter={16}>
                  <Col span={24}>
                     <Checkbox onChange={isSingleToggle} checked={isSingle}>
                        មិនទាន់រៀបការ
                     </Checkbox>
                  </Col>
               </Row> */}
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "weddingCertificateNum"]}
                        label="លេខសំបុត្រអាពាហ៍ពិពាហ៍"
                        // rules={[
                        //    {
                        //       required: true,
                        //       message: "សូមបំពេញលេខសំបុត្រអាពាហ៍ពិពាហ៍",
                        //    },
                        // ]}
                     >
                        <Input placeholder="លេខសំបុត្រអាពាហ៍ពិពាហ៍" />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "nationalityIDNum"]}
                        label="លេខអត្តសញ្ញាណប័ណ្ណ"
                        // rules={[
                        //    {
                        //       required: true,
                        //       message: "សូមបំពេញលេខអត្តសញ្ញាណប័ណ្ណ",
                        //    },
                        // ]}
                     >
                        <Input placeholder="លេខអត្តសញ្ញាណប័ណ្ណ" />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "fullName"]}
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
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "fullNameLatin"]}
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
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "statusLive"]}
                        label="ស្ថានភាព"
                        rules={[
                           {
                              required: true,
                              message: "សូមជ្រើសរើសស្ថានភាព",
                           },
                        ]}
                     >
                        <Radio.Group options={status}></Radio.Group>
                     </Form.Item>
                  </Col>
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "occupation"]}
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
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "birthDate"]}
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
                           format="DD/MM/YYYY"
                           style={{ width: "100%" }}
                           //  onChange={onStartDateChange}
                        />
                     </Form.Item>
                  </Col>
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "nationality"]}
                        label="ជនជាតិ"
                        rules={[
                           {
                              required: true,
                              message: "សូមបំពេញជនជាតិ",
                           },
                        ]}
                     >
                        <Input placeholder="ជនជាតិ" />
                     </Form.Item>
                  </Col>
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "ethnicity"]}
                        label="សញ្ជាតិ"
                        rules={[
                           {
                              required: true,
                              message: "សូមបំពេញសញ្ជាតិ",
                           },
                        ]}
                     >
                        <Input placeholder="សញ្ជាតិ" />
                     </Form.Item>
                  </Col>
               </Row>
               <Row gutter={16}>
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "workPlace"]}
                        label="ទីកន្លែងបំពេញការងារ"
                        // rules={[
                        //    {
                        //       required: true,
                        //       message: "សូមបំពេញទីកន្លែងបំពេញការងារ",
                        //    },
                        // ]}
                     >
                        <Input placeholder="ទីកន្លែងបំពេញការងារ" />
                     </Form.Item>
                  </Col>
                  <Col span={12}>
                     <div>
                        <p>File Name</p>
                        <Upload>
                           <Button icon={<UploadOutlined />}>
                              ឯកសារសំបុត្រអាពាហ៏ពិពាហ៏
                           </Button>
                        </Upload>
                     </div>
                  </Col>
               </Row>
            </div>

            {/* Birth Place */}
            <div className={styles.birthPlaceContainer}>
               <h1 className={styles.title}>
                  <UserOutlined></UserOutlined>ទីកន្លែងកំណើត
               </h1>
               <Row gutter={16}>
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "birthPlace", "village"]}
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
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "birthPlace", "commune"]}
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
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "birthPlace", "district"]}
                        label="ក្រុង/ស្រុក/ខណ្ឌ"
                        // rules={[
                        //    {
                        //       required: true,
                        //       message: "សូមបំពេញក្រុង/ស្រុក/ខណ្ឌ",
                        //    },
                        // ]}
                     >
                        <Input placeholder="ក្រុង/ស្រុក/ខណ្ឌ" />
                     </Form.Item>
                  </Col>
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "birthPlace", "province"]}
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
               <Row gutter={16}>
                  <Col span={24}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "birthPlace", "other"]}
                        label="ទីកន្លែងកំណើតផ្សេងៗ"
                        // rules={[
                        //    {
                        //       required: true,
                        //       message: "សូមបំពេញទីកន្លែងកំណើតផ្សេងៗ",
                        //    },
                        // ]}
                     >
                        <Input placeholder="ទីកន្លែងកំណើតផ្សេងៗ" />
                     </Form.Item>
                  </Col>
               </Row>
            </div>

            {/* Address */}
            <div className={styles.addressContainer}>
               <h1 className={styles.title}>
                  <UserOutlined></UserOutlined>ទីលំនៅបច្ចុប្បន្ន
               </h1>
               <Row gutter={16}>
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "currentResidence", "houseNum"]}
                        label="ផ្ទះលេខ"
                        // rules={[
                        //    {
                        //       required: true,
                        //       message: "សូមបំពេញផ្ទះលេខ",
                        //    },
                        // ]}
                     >
                        <Input placeholder="ផ្ទះលេខ" />
                     </Form.Item>
                  </Col>
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "currentResidence", "streetNum"]}
                        label="ផ្លូវលេខ"
                        // rules={[
                        //    {
                        //       required: true,
                        //       message: "សូមបំពេញផ្លូវលេខ",
                        //    },
                        // ]}
                     >
                        <Input placeholder="ផ្លូវលេខ" />
                     </Form.Item>
                  </Col>
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "currentResidence", "village"]}
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
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "currentResidence", "commune"]}
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
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "currentResidence", "district"]}
                        label="ក្រុង/ស្រុក/ខណ្ឌ"
                        // rules={[
                        //    {
                        //       required: true,
                        //       message: "សូមបំពេញក្រុង/ស្រុក/ខណ្ឌ",
                        //    },
                        // ]}
                     >
                        <Input placeholder="ក្រុង/ស្រុក/ខណ្ឌ" />
                     </Form.Item>
                  </Col>
                  <Col span={6}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "currentResidence", "province"]}
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
                  <Col span={12}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "phoneNumber"]}
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
               <Row gutter={12}>
                  <Col span={24}>
                     <Form.Item
                        style={{ marginBottom: 10 }}
                        name={["partnerInfo", "currentResidence", "other"]}
                        label="ទីលំនៅបច្ចុប្បន្នផ្សេងៗ"
                        // rules={[
                        //    {
                        //       required: true,
                        //       message: "សូមបំពេញទីលំនៅបច្ចុប្បន្នផ្សេងៗ",
                        //    },
                        // ]}
                     >
                        <Input placeholder="ទីលំនៅបច្ចុប្បន្នផ្សេងៗ" />
                     </Form.Item>
                  </Col>
               </Row>
            </div>
         </Form>

         {/* Children */}
         <ChildrenInfo userData={userData}></ChildrenInfo>

         <div className={styles.btnContainer}>
            <Button icon={<SaveOutlined />} onClick={onSave}>
               រក្សាទុក
            </Button>
         </div>
      </div>
   );
};

export default SpouseInfo;
